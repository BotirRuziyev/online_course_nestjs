import { Injectable } from '@nestjs/common';
import { Lessons } from '@prisma/client';
import { IBaseService } from 'src/base';
import { CreateLessonsDto, UpdateLessonsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonsService implements IBaseService<Lessons, CreateLessonsDto, UpdateLessonsDto> {
  constructor(private _prisma: PrismaService) {}

  create(data: CreateLessonsDto): Promise<Lessons> {
    return this._prisma.lessons.create({ data });
  }

  getAll(): Promise<Lessons[]> {
    return this._prisma.lessons.findMany();
  }

  getById(id: number): Promise<Lessons> {
    return this._prisma.lessons.findUnique({ where: { id } });
  }

  updateById(id: number, data: UpdateLessonsDto): Promise<Lessons> {
    return this._prisma.lessons.update({ where: { id }, data });
  }

  deleteById(id: number): Promise<Lessons> {
    return this._prisma.lessons.delete({ where: { id } });
  }

  deleteAll() {
    return this._prisma.lessons.deleteMany();
  }
}
