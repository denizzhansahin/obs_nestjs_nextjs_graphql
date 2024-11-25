import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import { User } from "./User";
import { Enrollments } from "./Enrollments";

@Entity({ name: 'student' })
@ObjectType()
export class Student {
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
    birth_date: Date

    @Column()
    @Field()
    enrollment_date: Date

    @Column()
    @Field()
    status: string

    @Column()
    @CreateDateColumn()
    @Field()
    created_at: Date

    @Column()
    @UpdateDateColumn()
    @Field()
    updated_at: Date

    @OneToOne(() => User, user => user.student)
    @JoinColumn({ name: 'userId' })
    @Field(() => User)
    user: User;


    /*
    @OneToMany(() => Enrollments, enrollments => enrollments.students)
    @JoinColumn({ name: 'enrollments' })
    @Field(() => Enrollments)
    enrollments: Enrollments[];
    */

    // Enrollment ve Student arasındaki ilişki (Many-to-Many)
    // Bir öğrenci birden fazla kayda sahip olabilir.
    // Bir kayıt birden fazla öğrenci ile ilişkilidir.
    @ManyToMany(() => Enrollments, (enrollment) => enrollment.students,{onDelete: 'CASCADE' })
    @Field(() => [Enrollments], { nullable: true })
    enrollments: Enrollments[];
}