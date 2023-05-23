export interface IBaseService<T, C, U> {
  create(data: C): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  updateById(id: number, data: U): Promise<T>;
  deleteById(id: number): Promise<T>;
}
