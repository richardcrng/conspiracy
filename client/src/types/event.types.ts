
export enum SocketEvent {
  JOIN = 'join'
}

export interface JoinEvent {
  playerName: string;
}