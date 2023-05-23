import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLessonsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;
}
