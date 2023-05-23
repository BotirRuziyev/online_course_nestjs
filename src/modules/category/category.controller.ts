import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { IBaseController } from 'src/base';
import { Category } from '@prisma/client';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('category')
export class CategoryController implements IBaseController<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor(private categoryService: CategoryService) {}

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/category',
        filename: (req: any, file: any, callback: any) => {
          callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        },
      }),
    }),
  )
  @Post('createCategory')
  create(@Body() dto: CreateCategoryDto, @UploadedFile() image: Express.Multer.File): Promise<Category> {
    dto.image = image.filename;
    return this.categoryService.create(dto);
  }

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getById(id);
  }

  @Put('updateCategory')
  updateById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.updateById(id, dto);
  }

  @Delete('delete/:id')
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.deleteById(id);
  }

  @Delete('deleteAll')
  deleteAll() {
    return this.categoryService.deleteAll();
  }
}
