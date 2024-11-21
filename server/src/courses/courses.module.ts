import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { Courses } from 'src/Entities/Courses';
import { CoursesGraphQl } from 'src/GraphQl/CoursesQuery';

@Module({
    imports: [TypeOrmModule.forFeature([Courses])], // Course Entity'si burada ekleniyor
    providers: [CoursesService,CoursesGraphQl],
    exports: [CoursesService],
})
export class CoursesModule {}
