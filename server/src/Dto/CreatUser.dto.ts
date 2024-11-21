import { IsString, Length, IsDate , IsEnum} from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {

    @IsString()
    @Field()
    @Length(2,20,{message:'hatalı uzunluk, en az 2 en fazla 20'})
    username:string

    @IsString()
    @Field()
    password:string

    @Field()
    @IsEnum(["ADMIN" , "INSTRUCTORS" , "STUDENT"],
        {message : 'Valid role required'}
    )
    role : "ADMIN" | "INSTRUCTORS" | "STUDENT"

}