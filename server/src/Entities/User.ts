import {Field,Int, ObjectType} from "@nestjs/graphql"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { Student } from "./Student";
import { Instructors } from "./Instructors";

@Entity({name:'users'})
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field((type)=>Int)
    id:number

    @Column()
    @Field()
    username:string

    @Column()
    @Field()
    password:string

    @Column()
    @Field()
    role:string

    @Column()
    @CreateDateColumn()
    @Field()
    created_at:Date

    @Column()
    @UpdateDateColumn()
    @Field()
    updated_at:Date

    @OneToOne(() => Student, student => student.user)
    @Field(() => Student, { nullable: true })
    student: Student;

    @OneToOne(() => Instructors, instructors => instructors.user)
    @Field(() => Instructors, { nullable: true })
    instructors: Instructors;
}