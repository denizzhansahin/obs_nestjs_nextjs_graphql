import { IsString, Length, IsDate , IsEnum, IsEmail, IsOptional, IsInt} from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateCoursesDto {

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    name:string

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    code:string

    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    description:string

    @IsOptional()
    @Field({ nullable: true })
    @IsInt()
    credit:number

    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    semester:string

}