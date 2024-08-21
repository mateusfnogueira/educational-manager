import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Course } from './interfaces/course.interface';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { name } = createCourseDto;
    const courseShared = await this.courseModel.findOne({ name }).exec();

    if (courseShared) {
      throw new BadRequestException({
        message: 'Course already exists',
        status: 400,
        error: 'Bad Request',
      });
    }

    const createdCourse = new this.courseModel(createCourseDto);

    this.logger.log(`createCourseDto: ${JSON.stringify(createCourseDto)}`);
    return await createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    const courses = await this.courseModel.find().exec();
    if (!courses.length) {
      throw new BadRequestException({
        message: 'Courses not found',
        status: 400,
        error: 'Bad Request',
      });
    }
    return courses;
  }

  async findById(_id: string, name: string): Promise<Course> {
    if (!_id && !name) {
      throw new BadRequestException({
        message: 'Id or name is required',
        status: 400,
        error: 'Bad Request',
      });
    }

    let courseShared: Course;

    if (_id) {
      courseShared = await this.courseModel.findById(_id).exec();
    } else if (name) {
      courseShared = await this.courseModel.findOne({ name }).exec();
    }

    if (!courseShared) {
      throw new BadRequestException({
        message: 'Course not found',
        status: 400,
        error: 'Bad Request',
      });
    }

    return courseShared;
  }

  async updateCourseById(
    _id: string,
    createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    const courseShared = await this.courseModel;
    this.logger.log(`courseShared: ${JSON.stringify(courseShared)}`);
    return await this.courseModel.findOneAndUpdate(
      { _id },
      createCourseDto,
      {},
    );
  }

  async deleteCourseById(_id: string): Promise<any> {
    const courseShared = await this.courseModel.findOne({ _id }).exec();

    if (!courseShared) {
      throw new BadRequestException({
        message: 'Course not found',
        status: 400,
        error: 'Bad Request',
      });
    }

    this.logger.log(`courseShared: ${JSON.stringify(courseShared)}`);

    return await this.courseModel.deleteOne({ _id }).exec();
  }
}
