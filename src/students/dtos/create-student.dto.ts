import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { IAddress } from '../interfaces';
import { ICourse } from 'src/courses/interfaces';

export class CreateStudentDto extends Document {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly cpf: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsObject()
  @IsNotEmpty()
  readonly address: IAddress;

  @IsBoolean()
  @IsNotEmpty()
  readonly isUnderage: boolean;

  @IsString()
  readonly motherName: string;

  @IsString()
  readonly fatherName: string;

  @IsArray()
  readonly courses: Array<ICourse>;
}