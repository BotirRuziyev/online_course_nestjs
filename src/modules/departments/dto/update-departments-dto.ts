import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateDepartmentsDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
