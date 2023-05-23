import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Departments } from '@prisma/client';
import { IBaseController } from 'src/base';
import { CreateDepartmentsDto, UpdateDepartmentsDto } from './dto';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController implements IBaseController<Departments, CreateDepartmentsDto, UpdateDepartmentsDto> {
  constructor(private departmentsService: DepartmentsService) {}

  @Post('create')
  create(@Body() dto: CreateDepartmentsDto, image?: any): Promise<Departments> {
    return this.departmentsService.create(dto);
  }

  @Get()
  getAll(): Promise<Departments[]> {
    return this.departmentsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Departments> {
    return this.departmentsService.deleteById(id);
  }

  @Put(':id')
  updateById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDepartmentsDto): Promise<Departments> {
    return this.departmentsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<Departments> {
    return this.departmentsService.deleteById(id);
  }

  @Delete()
  deleteAll() {
    return this.departmentsService.deleteAll();
  }
}
