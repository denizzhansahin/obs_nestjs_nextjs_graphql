import { IsString, Length, IsDate , IsEnum, IsOptional, IsInt, Min, Max} from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateGradesDto {

    @IsOptional()
    @Field({ nullable: true })
    @IsInt()
    enrollment_id:number

    @IsOptional()
    @Field({ nullable: true })
    @IsInt()
    id:number
    @IsOptional()
    @Field({ nullable: true })
    @IsInt()
    @Min(0)
    @Max(100)
    grade_value: number;


    @IsOptional()
    @Field({ nullable: true })
    @IsEnum(["EXAM" , "HOMEWORK" , "QUIZ", "PROJECT","FINAL"],
        {message : 'Valid grade_type required'}
    )
    grade_type : "EXAM" | "HOMEWORK" | "COMPLETED" | "PROJECT" | "FINAL"

}