import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { CourseInstructors } from "./CourseInstructors";
import { Enrollments } from "./Enrollments";

@Entity({ name: 'instructors' })
@ObjectType()
export class Instructors {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    userId: number

    @Column()
    @Field()
    first_name: string

    @Column()
    @Field()
    last_name: string

    @Column()
    @Field()
    email: string

    @Column()
    @Field()
    phone: string

    @Column()
    @Field()
    department: string

    @Column()
    @Field()
    birth_date: Date

    @Column()
    @Field()
    enrollment_date: Date

    @Column()
    @CreateDateColumn()
    @Field()
    created_at: Date

    @Column()
    @UpdateDateColumn()
    @Field()
    updated_at: Date

    @OneToOne(() => User, user => user.instructors)
    @JoinColumn({ name: 'userId' })
    @Field(() => User)
    user: User;

    @OneToMany(() => CourseInstructors, (courseInstructor) => courseInstructor.instructor)
    @Field(() => [CourseInstructors])
    courseInstructors: CourseInstructors[];

    // Bir akademisyen birden fazla enrollment kaydına sahip olabilir
    @OneToMany(() => Enrollments, (enrollment) => enrollment.academician, { nullable: true })
    @Field(() => [Enrollments], { nullable: true })  // nullable:true ekledik
    enrollments: Enrollments[];

}