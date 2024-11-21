import { IsString, Length, IsDate , IsEnum, IsEmail, IsOptional, IsInt} from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateCoursesDto {

    @IsString()
    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    name:string

    @IsString()
    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    code:string

    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    description:string

    @Field()
    @IsInt()
    credit:number

    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    semester:string

}