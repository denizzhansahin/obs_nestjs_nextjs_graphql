import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEnrollmentsDto } from 'src/Dto/CreateEnrollments.dto';
import { Courses } from 'src/Entities/Courses';
import { Enrollments } from 'src/Entities/Enrollments';
import { Student } from 'src/Entities/Student';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
        @InjectRepository(Enrollments) private enrollmentsRepository: Repository<Enrollments>,
        @InjectRepository(Courses) private coursesRepository: Repository<Courses>,
    ) { }

    // Kayıt getir
    /*
    async getEnrollments() {
        return await this.enrollmentsRepository.find({ relations: ['students', 'course','grades'] });  // Asenkron hale getirdik
    }
        */

    async getEnrollments() {
        return await this.enrollmentsRepository.find({
            relations: ['students', 'course', 'grades'], 
        });

    }

    // Yeni kayıt oluştur
    async createEnrollments(createdEnrollmentsData: CreateEnrollmentsDto) {
        const findStudent = await this.studentRepository.findOne({
            where: { userId: createdEnrollmentsData.student_id },
            relations: ['enrollments'],
        });
        if (!findStudent) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
    
        const findCourse = await this.coursesRepository.findOne({
            where: { id: createdEnrollmentsData.course_id },
            relations: ['enrollments'],
        });
        if (!findCourse) {
            throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
        }
    
        /*
        const newEnrollment = this.enrollmentsRepository.create({
            ...createdEnrollmentsData,
            students: findStudent,
            course: findCourse,
        });
        const savedEnrollment = await this.enrollmentsRepository.save(newEnrollment);
    
        findStudent.enrollments = [...(findStudent.enrollments || []), savedEnrollment];
        await this.studentRepository.save(findStudent);
    
        findCourse.enrollments = [...(findCourse.enrollments || []), savedEnrollment];
        await this.coursesRepository.save(findCourse);
    
        return savedEnrollment;
        */

            // Yeni kayıt oluşturuluyor
    const newEnrollment = this.enrollmentsRepository.create({
        ...createdEnrollmentsData,
        students: [findStudent],  // Tek bir öğrenci değil, öğrenci dizisi olmalı
        course: findCourse,
    });
    const savedEnrollment = await this.enrollmentsRepository.save(newEnrollment);

    // Öğrenci kaydına enrollments ekleniyor
    findStudent.enrollments = [...(findStudent.enrollments || []), savedEnrollment];
    await this.studentRepository.save(findStudent);

    // Kurs kaydına enrollments ekleniyor
    findCourse.enrollments = [...(findCourse.enrollments || []), savedEnrollment];
    await this.coursesRepository.save(findCourse);

    return savedEnrollment;
    }
}
