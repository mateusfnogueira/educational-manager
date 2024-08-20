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
    const createdCourse = new this.courseModel(createCourseDto);
    this.logger.log(`createCourseDto: ${JSON.stringify(createCourseDto)}`);
    return await createdCourse.save();
  }

  async deleteCourseById(_id: string): Promise<any> {
    const courseShared = await this.courseModel.findOne({ _id }).exec();
    this.logger.log(`courseShared: ${JSON.stringify(courseShared)}`);

    if (!courseShared) {
      throw new BadRequestException('Course not found');
    }

    return await this.courseModel.deleteOne({ _id }).exec();
  }
}
