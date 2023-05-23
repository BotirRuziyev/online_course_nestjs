import { Injectable } from '@nestjs/common';
import { Departments } from '@prisma/client';
import { IBaseService } from 'src/base';
import { CreateDepartmentsDto, UpdateDepartmentsDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService implements IBaseService<Departments, CreateDepartmentsDto, UpdateDepartmentsDto> {
  constructor(private _prisma: PrismaService) {}

  create(data: CreateDepartmentsDto): Promise<Departments> {
    return this._prisma.departments.create({ data });
  }

  getAll(): Promise<Departments[]> {
    return this._prisma.departments.findMany({});
  }

  getById(id: number): Promise<Departments> {
    return this._prisma.departments.findUnique({ where: { id } });
  }

  updateById(id: number, data: UpdateDepartmentsDto): Promise<Departments> {
    return this._prisma.departments.update({ where: { id }, data });
  }

  deleteById(id: number): Promise<Departments> {
    return this._prisma.departments.delete({ where: { id } });
  }

  deleteAll() {
    return this._prisma.departments.deleteMany();
  }
}
