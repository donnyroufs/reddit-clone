export type CreateEntityArgs<T> = Omit<T, "id">

export interface ICreate<T> {
  create(entity: CreateEntityArgs<T>): Promise<T>
}
