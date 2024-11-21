import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollments } from 'src/Entities/Enrollments';
import { EnrollmentsGraphQl } from 'src/GraphQl/EnrollmentsQuery';
import { EnrollmentsService } from './enrollments.service';
import { Student } from 'src/Entities/Student'; // Student Entity'si eklendi
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { Courses } from 'src/Entities/Courses';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollments, Student, Courses]), // Student Repository eklendi
    UsersModule,
    CoursesModule,
  ],
  providers: [EnrollmentsService, EnrollmentsGraphQl],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
