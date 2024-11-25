import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Courses } from './Courses';
import { Instructors } from './Instructors';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() // GraphQL ObjectType tanımı
@Entity('course_instructors')
export class CourseInstructors {
  @PrimaryGeneratedColumn()
  @Field(() => Int) // GraphQL alanı olarak tanımlandı
  id: number;

  @ManyToOne(() => Courses, (course) => course.courseInstructors, { nullable: true, onDelete: 'CASCADE' })
  @Field(() => Courses, { nullable: true }) // Make it nullable in GraphQL
  course: Courses;

  @ManyToOne(() => Instructors, (instructor) => instructor.courseInstructors)
  @Field(() => Instructors, { nullable: true }) // Öğretim görevlisi ilişkisinin GraphQL'de görünmesi için
  instructor: Instructors;

  @Column({ type: 'date' })
  @Field(() => String) // Tarih için GraphQL türü olarak String
  assigned_date: string;
}

//,{ cascade: true, onDelete: 'CASCADE' }