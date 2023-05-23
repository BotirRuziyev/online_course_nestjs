import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}
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
  @Post()
  upload(@UploadedFile() image: Express.Multer.File): Promise<{ url: string }> {
    return this.imageService.upload(image);
  }
}
