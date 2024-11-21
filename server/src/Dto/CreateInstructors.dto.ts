import { IsString, Length, IsDate , IsEnum, IsEmail, IsOptional} from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateInstructorDto {

    @Field((type)=>Int)
    userId:number

    @IsString()
    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    first_name:string

    @IsString()
    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    last_name:string

    @IsEmail()
    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    email:string

    @IsString()
    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    phone:string

    @IsString()
    @Field()
    @Length(2,50,{message:'hatalı uzunluk, en az 2 en fazla 50'})
    department:string

    @Field({ nullable: true })
    @IsOptional()  
    @IsDate({ message: 'Geçerli bir tarih olmalı' })
    birth_date?: Date;
  
    @Field({ nullable: true })
    @IsOptional()
    @IsDate({ message: 'Geçerli bir tarih olmalı' })
    enrollment_date?: Date;

}