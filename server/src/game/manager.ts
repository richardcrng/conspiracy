import { cloneDeep } from "lodash";
import { ServerIO } from "../../../client/src/types/event.types";
import { SERVER_IO } from "../server";
import {
  Game,
  GameStateCore,
  GameStatus,
  Player,
} from "../../../client/src/types/game.types";
import { PlayerManager } from "../player/manager";
import { generatePossibleConspiracyTargetId } from "../../../client/src/utils/setup-utils";
import { assertArrayLengthAtLeastOne } from "../../../client/src/utils/type-utils";

const GAMES_DB: Record<GameStateCore["id"], GameStateCore> = {};

export interface OperationBase<T = void> {
  status: "success" | "error";
  result?: T;
}

export interface OperationSuccess<T = void> extends OperationBase<T> {
  status: "success";
  result: T;
}

export interface OperationError<T = void> extends OperationBase<T> {
  status: "error";
  result?: never;
}

export type Operation<T = void> = OperationSuccess<T> | OperationError<T>;

/** Map of all game managers - to avoid creating new ones */
const gameManagerMap = new Map<string, GameManager>();

export class GameManager {
  _playerManagerMap = new Map<string, PlayerManager>();

  constructor(
    public gameId: string,
    public gamesStore: Record<string, Game> = GAMES_DB,
    public io: ServerIO = SERVER_IO
  ) {}

  static for(gameId: string): GameManager {
    const existingManager = gameManagerMap.get(gameId);
    if (existingManager) {
      return existingManager;
    } else {
      const newManager = new this(gameId);
      gameManagerMap.set(gameId, newManager);
      return newManager;
    }
  }

  _broadcast(): void {
    this._withPointer((pointer) => {
      this.io.emit("GAME_UPDATED", pointer);
    });
  }

  _mutate(mutativeCb: (game: Game) => void): void {
    this._withPointer(mutativeCb);
    this._broadcast();
  }

  _pointer(): Game | undefined {
    return this.gamesStore[this.gameId];
  }

  _set(game: Game): void {
    this.gamesStore[this.gameId] = game;
    this._broadcast();
  }

  _withPointer<T = void>(cb: (gamePointer: Game) => T): Operation<T> {
    const pointer = this._pointer();
    if (pointer) {
      const result = cb(pointer);
      return { status: "success", result };
    } else {
      return { status: "error" };
    }
  }

  public addPlayer(player: Omit<Player, "gameId">): void {
    this._mutate((game) => {
      game.players[player.id] = {
        ...player,
        gameId: this.gameId,
      };
    });
  }

  public createGameWithHost(host: Player) {
    const newGame: GameStateCore = {
      id: host.gameId,
      players: {
        [host.id]: host,
      },
      status: GameStatus.LOBBY,
      settings: {
        pctProbabilityConspiracy: 50,
      },
    };

    this._set(newGame);

    this.io.emit("HOST_GAME_CREATED", newGame, host.id);
  }

  public getHostPlayer(): Player | undefined {
    const host = Object.values(this.players()).find((player) => player.isHost);
    return host;
  }

  public getPlayer(playerId: string): Player | undefined {
    return this.managePlayer(playerId).snapshot();
  }

  public getPlayerOrFail(playerId: string) {
    const player = this.getPlayer(playerId);
    if (player) {
      return player;
    } else {
      throw new Error(`Couldn't find player with id ${playerId}`);
    }
  }

  public isJoinable(): boolean {
    const pointer = this._pointer();
    return !!pointer && pointer.status === GameStatus.LOBBY;
  }

  public isRetrievable(): boolean {
    return !!this._pointer();
  }

  public manageEachPlayer(cb: (playerManager: PlayerManager) => void) {
    for (const playerId in this.players()) {
      const playerManager = this.managePlayer(playerId);
      cb(playerManager);
    }
  }

  public managePlayer(
    playerId: string,
    aliasIds: string[] = []
  ): PlayerManager {
    const extantPlayerManager = this._playerManagerMap.get(playerId);
    if (extantPlayerManager) {
      return extantPlayerManager;
    } else {
      const newPlayerManager = new PlayerManager(this, playerId, aliasIds);
      this._playerManagerMap.set(playerId, newPlayerManager);
      return newPlayerManager;
    }
  }

  public playerIds(): string[] {
    return Object.keys(this.players());
  }

  public players(): Readonly<Record<string, Player>> {
    const snapshot = this.snapshot();
    if (snapshot) {
      return snapshot.players;
    } else {
      throw new Error("Could not find game to locate players for");
    }
  }

  public removePlayer(playerId: string): void {
    this._mutate((g) => {
      delete g.players[playerId];
    });
    this.io.emit("PLAYER_KICKED", this.gameId, playerId);
  }

  public set(game: Game): void {
    this._set(game);
  }

  public setWithPointer(cb: (gamePointer: Game) => Game): void {
    this._withPointer((pointer) => {
      this.set(cb(pointer));
    });
  }

  public snapshot(): Game | undefined {
    const operation = this._withPointer((pointer) => cloneDeep(pointer));
    if (operation.status === "success") {
      return operation.result;
    }
  }

  public start(): void {
    const playerList = this.playerIds();
    assertArrayLengthAtLeastOne(playerList);

    this._mutate((g) => {
      g.status = GameStatus.ONGOING;

      // pick conspiracy target
      g.conspiracyTargetId = generatePossibleConspiracyTargetId(
        playerList,
        g.settings.pctProbabilityConspiracy
      );
    });

    // each player starts with a null vote
    this.manageEachPlayer((p) => {
      p.castVote(null);
    });
  }

  /**
   * Updates a game, by applying a callback function,
   *  and broadcasts the update to sockets
   * @param mutativeCb - mutative callback function for the game data
   */
  public update(mutativeCb: (game: Game) => void) {
    this._mutate(mutativeCb);
  }

  public updateEachPlayer(mutativeCb: (player: Player) => void): void {
    for (const playerId in this.players()) {
      this.managePlayer(playerId).update(mutativeCb);
    }
  }

  public updatePlayer(playerId: string, mutativeCb: (player: Player) => void) {
    this.managePlayer(playerId).update(mutativeCb);
  }
}
