import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Student } from "./Student";
import { Courses } from "./Courses";
import { Grades } from "./Grades";
import { Instructors } from "./Instructors";

@Entity({ name: 'enrollments' })
@ObjectType()
export class Enrollments {
    @PrimaryGeneratedColumn()
    @Field({ nullable: true })
    id: number

    @Column()
    @Field({ nullable: true })
    enrollment_date: Date

    @Column()
    @Field({ nullable: true })
    status: string

    @Column()
    @CreateDateColumn()
    @Field({ nullable: true })
    created_at: Date

    @Column()
    @UpdateDateColumn()
    @Field({ nullable: true })
    updated_at: Date

    /*
    @ManyToOne(() => Student, students => students.enrollments)
    @JoinColumn({ name: 'student_id' })
    @Field(() => Student)
    students: Student;

    @ManyToMany(() => Courses, courses => courses.enrollments)
    @JoinColumn({ name: 'course_id' })
    @Field(() => Courses)
    @Field({nullable:true})
    course: Courses;
    */

    @ManyToOne(() => Courses, (course) => course.enrollments,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'course_id' })
    @Field(() => Courses,{ nullable: true })
    course: Courses;

    // Enrollment ve Student arasındaki ilişki (Many-to-Many)
    // Bir kayıt birden fazla öğrenci ile ilişkilidir ve bir öğrenci birden fazla kayda sahiptir.

    @ManyToMany(() => Student, (student) => student.enrollments,{
        cascade: true,
    })
    @JoinTable() // Many-to-Many ilişkisini yönetmek için JoinTable kullanılır.
    @Field(() => [Student], { nullable: true })
    students: Student[];

    @OneToMany(() => Grades, (grades) => grades.enrollments,{ cascade: true})
    @Field(() => [Grades])
    grades: Grades[];

    // Akademisyen ile ilişki - nullable:true ekledik
    @ManyToOne(() => Instructors, (instructor) => instructor.enrollments, { nullable: true })
    @JoinColumn({ name: 'academician_id' })
    @Field(() => Instructors, { nullable: true })  // nullable:true ekledik
    academician: Instructors; // Akademisyen ile olan ilişki
}