import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdateCourseInstructorDto {
    @IsOptional()
    @Field({ nullable: true })
    @IsInt()
    courseId: number;
    
    @IsOptional()
    @Field({ nullable: true })
    @IsInt()
    id: number;

    @IsOptional()
    @Field({ nullable: true })
    @IsInt()
    instructorId: number;

    @IsOptional()
    @Field({ nullable: true })
    @IsDate()
    assigned_date: string;
}
