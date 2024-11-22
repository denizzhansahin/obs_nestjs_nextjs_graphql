import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCoursesDto } from 'src/Dto/CreateCourses.dto';
import { Courses } from 'src/Entities/Courses';
import { CoursesService } from 'src/courses/courses.service';

@Resolver(() => Courses)
export class CoursesGraphQl {
    constructor(private coursesService: CoursesService) {}

    @Query(() => [Courses])
    getCourses() {
        return this.coursesService.getCourses();
    }

    @Mutation(() => Courses)
    createCourses(
        @Args('createdCoursesData') createdCoursesData: CreateCoursesDto,
    ) {
        return this.coursesService.createCourses(createdCoursesData);
    }
}
