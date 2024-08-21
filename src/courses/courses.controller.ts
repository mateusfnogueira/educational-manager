import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ICourse } from './interfaces';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('')
  async findCourses(
    @Query('id') _id: string,
    @Query('name') name: string,
  ): Promise<ICourse[] | ICourse> {
    if (_id || name) {
      return this.coursesService.findById(_id, name);
    }
    return this.coursesService.findAll();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async create(@Body() createCourseDto: CreateCourseDto): Promise<ICourse> {
    return this.coursesService.create(createCourseDto);
  }

  @Delete('')
  async deleteCourse(@Query('id') _id: string): Promise<any> {
    return this.coursesService.deleteCourseById(_id);
  }
}
