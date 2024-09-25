import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';

const DB_URL =
  'mongodb+srv://mateusfranco:<password>@clusterapijogadores.bjly0gm.mongodb.net/?retryWrites=true&w=majority&appName=ClusterApiJogadores';
const DB_PASSWORD = 'vsfni013';
console.log(process.env.DB_URL);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(DB_URL, {
      user: 'mateusfranco',
      pass: DB_PASSWORD,
    }),
    CoursesModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
