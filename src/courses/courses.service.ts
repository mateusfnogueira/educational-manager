import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  async create(createCourseDto: any) {
    throw new Error('Method not implemented.');
    return createCourseDto;
  }
}
