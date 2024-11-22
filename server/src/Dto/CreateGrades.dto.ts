import { IsString, Length, IsDate , IsEnum, IsOptional, IsInt, Min, Max} from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateGradesDto {

    @Field((type)=>Int)
    @IsInt()
    enrollment_id:number

    @Field(() => Int)
    @IsInt()
    @Min(0)
    @Max(100)
    grade_value: number;


    @Field()
    @IsEnum(["EXAM" , "HOMEWORK" , "QUIZ", "PROJECT","FINAL"],
        {message : 'Valid grade_type required'}
    )
    grade_type : "EXAM" | "HOMEWORK" | "COMPLETED" | "PROJECT" | "FINAL"

}