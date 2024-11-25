import { IsString, Length, IsDate , IsEnum, IsEmail, IsOptional} from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateInstructorDto {


    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    first_name:string

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    last_name:string

    @IsEmail()
    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    email:string

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    phone:string

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    department:string

    @Field({ nullable: true })
    @IsOptional()
    @Field({ nullable: true })  
    @IsDate({ message: 'Geçerli bir tarih olmalı' })
    birth_date?: Date;
  
    @Field({ nullable: true })
    @IsOptional()
    @Field({ nullable: true })
    @IsDate({ message: 'Geçerli bir tarih olmalı' })
    enrollment_date?: Date;

}