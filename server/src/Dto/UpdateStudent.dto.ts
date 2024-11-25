import { IsString, Length, IsDate , IsEnum, IsEmail, IsOptional} from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateStudentDto {


    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    first_name:string

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    last_name:string

    @IsOptional()
    @IsEmail()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    email:string

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    phone:string

    @IsOptional()
    @Field({ nullable: true })
    @IsOptional()  
    @IsDate({ message: 'Geçerli bir tarih olmalı' })
    birth_date?: Date;
  
    @IsOptional()
    @Field({ nullable: true })
    @IsOptional()
    @IsDate({ message: 'Geçerli bir tarih olmalı' })
    enrollment_date?: Date;

    @IsOptional()
    @Field({ nullable: true })
    @IsEnum(["ACTIVE" , "INACTIVE" , "GRADUATED"],
        {message : 'Valid status required'}
    )
    status : "ACTIVE" | "INACTIVE" | "GRADUATED"

}