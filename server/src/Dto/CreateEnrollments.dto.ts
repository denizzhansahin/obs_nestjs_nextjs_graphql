import { IsString, Length, IsDate, IsEnum, IsOptional } from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateEnrollmentsDto {

    @Field((type) => Int)
    student_id: number

    @Field((type) => Int)
    course_id: number

    @Field({ nullable: true })
    @IsOptional()
    @IsDate({ message: 'Geçerli bir tarih olmalı' })
    enrollment_date?: Date;

    @Field()
    @IsEnum(["ACTIVE", "DROPPED", "COMPLETED"],
        { message: 'Valid status required' }
    )
    status: "ACTIVE" | "DROPPED" | "COMPLETED"

    // Akademisyen ID'si - nullable:true ekledik
    @Field((type) => Int, { nullable: true })
    @IsOptional()
    academician_id?: number; // Optional olarak ekledik
}