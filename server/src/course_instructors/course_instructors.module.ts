import { Module } from '@nestjs/common';
import { CourseInstructorsService } from './course_instructors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseInstructors } from 'src/Entities/CourseInstructors';
import { CourseInstructorsResolver } from 'src/GraphQl/CourseInstructorQuery';
import { Courses } from 'src/Entities/Courses';
import { Instructors } from 'src/Entities/Instructors';

@Module({
  imports: [TypeOrmModule.forFeature([CourseInstructors,Courses, Instructors])], // Course Entity'si burada ekleniyor
  providers: [CourseInstructorsService,CourseInstructorsResolver],
  exports: [CourseInstructorsService],
})
export class CourseInstructorsModule {}
