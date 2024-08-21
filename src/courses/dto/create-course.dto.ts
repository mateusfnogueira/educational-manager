import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { Document } from 'mongoose';

export class CreateCourseDto extends Document {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  weekDays: Array<any>;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  startClass: string;

  @IsString()
  @IsNotEmpty()
  endClass: string;

  @IsArray()
  @ArrayMinSize(1)
  students: Array<any>;
}
