import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseInstructors } from 'src/Entities/CourseInstructors';
import { CreateCourseInstructorDto } from 'src/Dto/CreateCourseInstructor.dto';
import { CourseInstructorsService } from 'src/course_instructors/course_instructors.service';
import { UpdateCourseInstructorDto } from 'src/Dto/UpdateCourseInstructors.dto';

@Resolver(() => CourseInstructors)
export class CourseInstructorsResolver {
  constructor(private readonly courseInstructorsService: CourseInstructorsService) {}

  // 1. Tüm Atamaları Getir
  @Query(() => [CourseInstructors], { name: 'getAllCourseInstructors' })
  async getAllCourseInstructors(): Promise<CourseInstructors[]> {
    return this.courseInstructorsService.getCourseInstructors();
  }

  @Query(() => CourseInstructors, { name: 'getCourseInstructorById' })
  async getCourseInstructorById(@Args('id', { type: () => Int }) id: number): Promise<CourseInstructors> {
    return this.courseInstructorsService.getCourseInstructorById(id);
  }

  // 3. Yeni Atama Oluştur
  @Mutation(() => CourseInstructors)
  async createCourseInstructor(
    @Args('createCourseInstructorDto') createCourseInstructorDto: CreateCourseInstructorDto,
  ): Promise<CourseInstructors> {
    return this.courseInstructorsService.create(createCourseInstructorDto);
  }


  @Mutation(() => CourseInstructors)
  async updateCourseInstructor(
    @Args('updateCourseInstructorDto') updateCourseInstructorDto: UpdateCourseInstructorDto,
  ): Promise<CourseInstructors> {
    return this.courseInstructorsService.update(updateCourseInstructorDto);
  }


  // CourseInstructor silme
  @Mutation(() => Boolean)
  async deleteCourseInstructor(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    try {
      await this.courseInstructorsService.deleteCourseInstructor(id);
      return true; // Silme başarılı
    } catch (error) {
      console.error(error);
      return false; // Silme başarısız
    }
  }
}
