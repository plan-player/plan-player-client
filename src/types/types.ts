export interface ObjectType<T> {
  [name: string]: (value: T) => T;
}
