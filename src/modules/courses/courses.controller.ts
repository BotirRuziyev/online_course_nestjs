import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { IBaseController } from 'src/base';
import { CreateCoursesDto, UpdateCoursesDto } from './dto';
import { Courses } from '@prisma/client';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('courses')
export class CoursesController implements IBaseController<Courses, CreateCoursesDto, UpdateCoursesDto> {
  constructor(private coursesService: CoursesService) {}

  //   @UseInterceptors(
  //     FileInterceptor('image', {
  //       storage: diskStorage({
  //         destination: './uploads/courses',
  //         filename: (req: any, file: any, callback: any) => {
  //           callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  //         },
  //       }),
  //     }),
  //   )
  @Post('create')
  create(@Body() dto: CreateCoursesDto): Promise<Courses> {
    return this.coursesService.create(dto);
  }

  @Get()
  getAll(): Promise<Courses[]> {
    return this.coursesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Courses> {
    return this.coursesService.deleteById(id);
  }

  @Put(':id')
  updateById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCoursesDto): Promise<Courses> {
    return this.coursesService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<Courses> {
    return this.coursesService.deleteById(id);
  }
}
