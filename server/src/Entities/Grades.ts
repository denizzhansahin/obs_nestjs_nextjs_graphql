import {Field,Int, ObjectType} from "@nestjs/graphql"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Enrollments } from "./Enrollments";

@Entity({name:'grades'})
@ObjectType()
export class Grades {
    @PrimaryGeneratedColumn()
    @Field({nullable:true})
    id:number

    @Column()
    @Field()
    grade_type:string

    @Column()
    @Field()
    grade_value:number

    @Column()
    @CreateDateColumn()
    @Field({nullable:true})
    created_at:Date

    @Column()
    @UpdateDateColumn()
    @Field({nullable:true})
    updated_at:Date


    @ManyToOne(() => Enrollments, (enrollments) => enrollments.grades)
    @JoinColumn({ name: 'enrollment_id' })
    @Field(() => Enrollments)
    enrollments: Enrollments[];
}