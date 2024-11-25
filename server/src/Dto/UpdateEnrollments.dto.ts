import { IsString, Length, IsDate, IsEnum, IsOptional } from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateEnrollmentsDto {

    @IsOptional()
    @Field({ nullable: true })
    course_id: number


    @IsOptional()
    @Field({ nullable: true })
    student_id: number

    @IsOptional()
    @Field({ nullable: true })
    @IsDate({ message: 'Geçerli bir tarih olmalı' })
    enrollment_date?: Date;

    @IsOptional()
    @Field({ nullable: true })
    @IsEnum(["ACTIVE", "DROPPED", "COMPLETED"],
        { message: 'Valid status required' }
    )
    status: "ACTIVE" | "DROPPED" | "COMPLETED"

    // Akademisyen ID'si - nullable:true ekledik
    @Field((type) => Int, { nullable: true })
    @IsOptional()
    academician_id?: number; // Optional olarak ekledik
}