import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';


const DB_URL = process.env.MONGODB_URL;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL.replace('<password>', DB_PASSWORD)),
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
