import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCoursesDto } from 'src/Dto/CreateCourses.dto';
import { UpdateCoursesDto } from 'src/Dto/UpdateCourse.dto';
import { Courses } from 'src/Entities/Courses';
import { CoursesService } from 'src/courses/courses.service';

@Resolver(() => Courses)
export class CoursesGraphQl {
    constructor(private coursesService: CoursesService) { }

    @Query(() => [Courses])
    getCourses() {
        return this.coursesService.getCourses();
    }

    @Query(() => Courses, { name: 'findCourseById' })
    async findCourseById(@Args('id') id: number) {
        return this.coursesService.findCourseById(id);
    }


    @Mutation(() => Courses)
    createCourses(
        @Args('createdCoursesData') createdCoursesData: CreateCoursesDto,
    ) {
        return this.coursesService.createCourses(createdCoursesData);
    }

    @Mutation((returns) => Courses)
    updateCourses(
        @Args('id') id: number, // Güncellenecek kullanıcının ID'si
        @Args('updateCourseData') updateCourseData: UpdateCoursesDto, // Güncelleme verisi
    ) {
        return this.coursesService.updateCourse(id, updateCourseData);
    }

    @Mutation(() => String, { name: 'deleteCourse' })
    async deleteCourse(@Args('id') id: number): Promise<string> {
        const course = await this.coursesService.findCourseById(id);

        if (!course) {
            throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
        }

        await this.coursesService.deleteCourse(id);

        return `Course with ID ${id} and its related records were deleted successfully`;
    }

}
