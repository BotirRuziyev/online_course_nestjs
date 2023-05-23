import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { CoursesModule } from './modules/courses/courses.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
    CoursesModule,
    DepartmentsModule,
    LessonsModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
