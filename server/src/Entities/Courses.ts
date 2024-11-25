import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Enrollments } from "./Enrollments";
import { CourseInstructors } from "./CourseInstructors";

@Entity({ name: 'courses' })
@ObjectType()
export class Courses {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number

    @Column()
    @Field()
    name: string

    @Column()
    @Field()
    code: string

    @Column()
    @Field()
    description: string

    @Column()
    @Field((type) => Int)
    credit: number

    @Column()
    @Field()
    semester: string


    @Column()
    @CreateDateColumn()
    @Field()
    created_at: Date

    @Column()
    @UpdateDateColumn()
    @Field()
    updated_at: Date


    /*
    @OneToMany(() => Enrollments, enrollments => enrollments.course)
    @JoinColumn({ name: 'enrollments' })
    @Field(() => Enrollments)
    enrollments: Enrollments[];
    */

    // Course ile Enrollment arasındaki ilişki (One-to-Many)
    // Bir kurs birden fazla kayıtla ilişkilidir. 
    @OneToMany(() => Enrollments, (enrollment) => enrollment.course,{ cascade: true, onDelete: 'CASCADE' })
    @Field(() => [Enrollments])
    enrollments: Enrollments[];

    @OneToMany(() => CourseInstructors, (courseInstructor) => courseInstructor.course, { onDelete: 'CASCADE' })
    @Field(() => [CourseInstructors],{ nullable: true })
    courseInstructors: CourseInstructors[];
}