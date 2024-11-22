import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollments } from 'src/Entities/Enrollments';
import { EnrollmentsGraphQl } from 'src/GraphQl/EnrollmentsQuery';
import { EnrollmentsService } from './enrollments.service';
import { Student } from 'src/Entities/Student'; // Student Entity'si eklendi
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { Courses } from 'src/Entities/Courses';
import { Grades } from 'src/Entities/Grades';
import { GradesResolver } from 'src/GraphQl/GradesQuery';
import { GradesModule } from 'src/grades/grades.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollments, Student, Courses,Grades]), // Student Repository eklendi
    //UsersModule,
    CoursesModule,
    forwardRef(() => UsersModule),
    forwardRef(() => GradesModule),
  ],
  providers: [EnrollmentsService, EnrollmentsGraphQl],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
