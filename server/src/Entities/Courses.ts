import {Field,Int, ObjectType} from "@nestjs/graphql"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";

@Entity({name:'courses'})
@ObjectType()
export class Courses {
    @PrimaryGeneratedColumn()
    @Field((type)=>Int)
    id:number

    @Column()
    @Field()
    name:string

    @Column()
    @Field()
    code:string

    @Column()
    @Field()
    description:string

    @Column()
    @Field((type)=>Int)
    credit:number

    @Column()
    @Field()
    semester:string


    @Column()
    @CreateDateColumn()
    @Field()
    created_at:Date

    @Column()
    @UpdateDateColumn()
    @Field()
    updated_at:Date
}