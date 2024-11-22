import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesService } from './grades.service';
import { GradesResolver } from 'src/GraphQl/GradesQuery';
import { Grades } from 'src/Entities/Grades';
import { Enrollments } from 'src/Entities/Enrollments';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { Student } from 'src/Entities/Student';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Grades, Enrollments,Student]),
    EnrollmentsModule, // Enrollments modülünü buraya ekledik
  ],
  providers: [GradesService, GradesResolver],
  exports: [GradesService], // GradesService'in dışa aktarılması sağlanmalı
})
export class GradesModule {}
