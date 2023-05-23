import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDepartmentsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  coursesId: number;
}
