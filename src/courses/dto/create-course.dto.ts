import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly categorie: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<any>;}
