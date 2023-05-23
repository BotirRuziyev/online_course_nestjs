import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Lessons } from '@prisma/client';
import { IBaseController } from 'src/base';
import { CreateLessonsDto, UpdateLessonsDto } from './dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController implements IBaseController<Lessons, CreateLessonsDto, UpdateLessonsDto> {
  constructor(private lessonsService: LessonsService) {}

  @Post('create')
  create(@Body() dto: CreateLessonsDto, image?: any): Promise<Lessons> {
    return this.lessonsService.create(dto);
  }

  @Get()
  getAll(): Promise<Lessons[]> {
    return this.lessonsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Lessons> {
    return this.lessonsService.getById(id);
  }

  @Put(':id')
  updateById(@Param('id', ParseIntPipe) id: number, dto: UpdateLessonsDto): Promise<Lessons> {
    return this.lessonsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<Lessons> {
    return this.lessonsService.deleteById(id);
  }

  @Delete()
  deleteAll() {
    return this.lessonsService.deleteAll();
  }
}
