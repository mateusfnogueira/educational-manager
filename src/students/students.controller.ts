import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { IStudent } from './interfaces';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('')
  async findStudents(
    @Query('id') _id: string,
    @Query('name') name: string,
  ): Promise<IStudent[] | IStudent> {
    if (_id || name) {
      return await this.studentsService.findById(_id, name);
    }
    return await this.studentsService.findAll();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<IStudent> {
    return await this.studentsService.create(createStudentDto);
  }

  @Post('/add-course')
  @UsePipes(ValidationPipe)
  async addCourse(
    @Query('studentId') studentId: string,
    @Query('courseId') courseId: string,
  ): Promise<IStudent> {
    return await this.studentsService.addCourse(studentId, courseId);
  }
}
