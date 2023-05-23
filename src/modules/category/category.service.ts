import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { IBaseService } from 'src/base';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService implements IBaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor(private _prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    return this._prisma.category.create({ data });
  }

  async getAll(): Promise<Category[]> {
    return this._prisma.category.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        description: true,
        image: true,
        Courses: { select: { id: true, title: true, description: true, author: true, amount: true, image: true } },
      },
    });
  }

  async getById(id: number): Promise<Category> {
    return this._prisma.category.findUnique({ where: { id } });
  }

  async updateById(id: number, data: UpdateCategoryDto): Promise<Category> {
    return this._prisma.category.update({ where: { id }, data });
  }

  async deleteById(id: number): Promise<Category> {
    return this._prisma.category.delete({ where: { id } });
  }

  async deleteAll() {
    return this._prisma.category.deleteMany();
  }
}
