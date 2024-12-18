import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/Entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGraphQl } from 'src/GraphQl/UserQuery';
import { StudentGraphQl } from 'src/GraphQl/StudentQuery';
import { Student } from 'src/Entities/Student';
import { Instructors } from 'src/Entities/Instructors';
import { InstructorsGraphQl } from 'src/GraphQl/InstructorQuery';
import { CoursesGraphQl } from 'src/GraphQl/CoursesQuery';
import { Courses } from 'src/Entities/Courses';
import { CoursesService } from 'src/courses/courses.service';
import { GradesModule } from 'src/grades/grades.module';
import { Grades } from 'src/Entities/Grades';
import { CoursesModule } from 'src/courses/courses.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { CourseInstructors } from 'src/Entities/CourseInstructors';
import { Enrollments } from 'src/Entities/Enrollments';
@Module({
  controllers: [],
  providers: [UsersService,UserGraphQl,StudentGraphQl,InstructorsGraphQl],
  exports: [UsersService],
  imports:[
    TypeOrmModule.forFeature([User,Student,Instructors,Grades,CourseInstructors,Enrollments]),
    GradesModule,
    EnrollmentsModule
  ]
})

export class UsersModule {}
