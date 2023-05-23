import { Injectable } from '@nestjs/common';
import { IBaseService } from 'src/base';
import { CreateCoursesDto, UpdateCoursesDto } from './dto';
import { Courses } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService implements IBaseService<Courses, CreateCoursesDto, UpdateCoursesDto> {
  constructor(private _prismaService: PrismaService) {}

  async create(data: CreateCoursesDto): Promise<Courses> {
    return this._prismaService.courses.create({ data });
  }

  async getAll(): Promise<Courses[]> {
    return this._prismaService.courses.findMany({});
  }

  async getById(id: number): Promise<Courses> {
    return this._prismaService.courses.findUnique({ where: { id: id } });
  }

  async updateById(id: number, data: UpdateCoursesDto): Promise<Courses> {
    return this._prismaService.courses.update({ where: { id }, data });
  }

  async deleteById(id: number): Promise<Courses> {
    return this._prismaService.courses.delete({ where: { id } });
  }
}
