import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { IStudent } from './interfaces';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createStudent(
        @Body() createStudentDto: CreateStudentDto,
    ): Promise<IStudent> {
        return createStudentDto;
    }
}
