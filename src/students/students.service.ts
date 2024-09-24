import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from './interfaces';
import { CreateStudentDto } from './dtos/create-student.dto';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<IStudent>,
    @InjectModel('Course') private readonly courseService: CoursesService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const { name } = createStudentDto;
    const studentShared = await this.studentModel.findOne({ name }).exec();

    if (studentShared) {
      throw new BadRequestException({
        message: 'Student already exists',
        status: 400,
        error: 'Bad Request',
      });
    }
    const createdStudent = new this.studentModel(createStudentDto);
    this.logger.log(`createStudentDto: ${JSON.stringify(createStudentDto)}`);
    return await createdStudent.save();
  }

  async findAll(): Promise<IStudent[]> {
    const students = await this.studentModel.find().exec();
    if (!students.length) {
      throw new BadRequestException({
        message: 'Students not found',
        status: 400,
        error: 'Bad Request',
      });
    }
    return students;
  }

  async findById(_id: string, name: string): Promise<IStudent> {
    if (!_id && !name) {
      throw new BadRequestException({
        message: 'Id or name is required',
        status: 400,
        error: 'Bad Request',
      });
    }

    let studentShared: IStudent;

    if (_id) {
      studentShared = await this.studentModel.findById(_id).exec();
    } else if (name) {
      studentShared = await this.studentModel.findOne({ name }).exec();
    }

    if (!studentShared) {
      throw new BadRequestException({
        message: 'Student not found',
        status: 400,
        error: 'Bad Request',
      });
    }

    return studentShared;
  }

  async addCourse(studentId: string, courseId: string): Promise<IStudent> {
    const student = await this.studentModel.findById(studentId).exec();

    if (!student) {
      throw new BadRequestException({
        message: 'Student not found',
        status: 400,
        error: 'Bad Request',
      });
    }

    const courseExists = student.courses.some(
      (course) => course._id.toString() === courseId,
    );

    if (courseExists) {
      throw new BadRequestException({
        message: 'Course already added',
        status: 400,
        error: 'Bad Request',
      });
    }

    const searchedCourse = await this.courseService.findById(courseId, null);

    if (!searchedCourse) {
      throw new BadRequestException({
        message: 'Course not found',
        status: 400,
        error: 'Bad Request',
      });
    }

    const courseToAdd = {
      _id: searchedCourse._id,
      name: searchedCourse.name,
      price: searchedCourse.price,
      weekDays: searchedCourse.weekDays,
      duration: searchedCourse.duration,
      startClass: searchedCourse.startClass,
      endClass: searchedCourse.endClass,
    };

    student.courses.push(courseToAdd);
    await student.save();
    this.logger.log(`Course added to student: ${JSON.stringify(student)}`);
    await this.courseService.addStudentToCourse(courseId, {
      _id: student._id,
      name: student.name,
    });
    return student;
  }
}
