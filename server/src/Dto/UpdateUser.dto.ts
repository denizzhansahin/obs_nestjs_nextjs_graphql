import { IsString, Length, IsEnum, IsOptional } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Field({ nullable: true }) // GraphQL için alanı opsiyonel yapıyoruz
    @Length(2, 20, { message: 'hatalı uzunluk, en az 2 en fazla 20' })
    username?: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true }) // GraphQL için alanı opsiyonel yapıyoruz
    password?: string;

    @IsOptional()
    @Field({ nullable: true }) // GraphQL için alanı opsiyonel yapıyoruz
    @IsEnum(["ADMIN", "INSTRUCTORS", "STUDENT"], {
        message: 'Valid role required',
    })
    role?: "ADMIN" | "INSTRUCTORS" | "STUDENT";
}
