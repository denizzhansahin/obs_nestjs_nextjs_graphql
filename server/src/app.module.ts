import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';


import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { User } from './Entities/User';
import { UserGraphQl } from './GraphQl/UserQuery';
import { StudentGraphQl } from './GraphQl/StudentQuery';
import { Student } from './Entities/Student';
import { Instructors } from './Entities/Instructors';
import { InstructorsGraphQl } from './GraphQl/InstructorQuery';
import { CoursesGraphQl } from './GraphQl/CoursesQuery';
import { Courses } from './Entities/Courses';
import { CoursesService } from './courses/courses.service';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { EnrollmentsGraphQl } from './GraphQl/EnrollmentsQuery';
import { Enrollments } from './Entities/Enrollments';

@Module({
  imports: [UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile:'src/schema.gql'
    }),
    TypeOrmModule.forRoot({ //veya getCongig
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      logging: true,
      entities: [User,Student,Instructors,Courses,Enrollments],
      migrations: [],
      subscribers: [],
    }),
    CoursesModule,
    EnrollmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService,UserGraphQl,StudentGraphQl,InstructorsGraphQl,CoursesGraphQl,EnrollmentsGraphQl],
})
export class AppModule {}
