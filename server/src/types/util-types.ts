import { BaseEntity } from "typeorm";

type EntityKeys = | 'id' | 'hasId' | 'recover' | 'reload' | 'remove' | 'save' | 'softRemove'

export type DeEntity<T> =
  T extends Array<infer E>
    ? DeEntity<E>[]
    : {
      [K in keyof Omit<T, EntityKeys>]: Omit<T, EntityKeys>[K] extends CallableFunction
        ? Omit<T, EntityKeys>[K]
        : DeEntity<Omit<T, EntityKeys>[K]>
    }

// export type DeEntity<T> = {
//   [K in keyof Omit<T, EntityKeys>]: Omit<T, EntityKeys>[K] extends CallableFunction
//     ? Omit<T, EntityKeys>[K]
//     : DeEntity<Omit<T, EntityKeys>[K]>
// }