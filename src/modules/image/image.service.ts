import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {
  constructor(private _prisma: PrismaService) {}

  async upload(imgFile: any): Promise<{ url: string }> {
    await this._prisma.image.create({ data: { imgName: imgFile.filename } });
    return { url: `http://localhost:3333/${imgFile.filename}` };
  }
}
