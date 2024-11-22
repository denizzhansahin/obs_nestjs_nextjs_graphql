import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsInt } from 'class-validator';

@InputType()
export class CreateCourseInstructorDto {
  @Field(() => Int)
  @IsInt()
  courseId: number;

  @Field(() => Int)
  @IsInt()
  instructorId: number;

  @Field(() => String)
  @IsDate()
  assigned_date: string;
}
