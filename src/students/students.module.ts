import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './interfaces';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Students',
        schema: StudentSchema,
      },
    ]),
    CoursesModule,
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
