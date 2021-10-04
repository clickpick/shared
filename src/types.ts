export type Nullable<T> = T | null;

export type AnyObject = Record<string, any>;

export type AnyFunction = (...args: any[]) => any;

export interface Storage<Entity extends AnyObject, ID extends keyof any> {
  ids: Nullable<ID[]>;
  storage: Record<ID, Entity>;
}
