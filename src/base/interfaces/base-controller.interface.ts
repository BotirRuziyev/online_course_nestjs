import { Response } from 'express';

export interface IBaseController<T, C, U> {
  create(dto: C, image?: any): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  updateById(id: number, dto: U): Promise<T>;
  deleteById(id: number): Promise<T>;
}
