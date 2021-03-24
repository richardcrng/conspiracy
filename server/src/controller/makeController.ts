import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

export const makeController = <Entity>(entity: Entity) => {
  class Controller {
    // @ts-ignore
    private repository = getRepository(entity);

    async all(request: Request, response: Response, next: NextFunction) {
      return this.repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
      return this.repository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
      return this.repository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
      let activityToRemove = await this.repository.findOne(request.params.id);
      await this.repository.remove(activityToRemove);
    }
  }

  return Controller
}