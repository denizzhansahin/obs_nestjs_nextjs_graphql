import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGradesDto } from 'src/Dto/CreateGrades.dto';
import { Grades } from 'src/Entities/Grades';
import { Enrollments } from 'src/Entities/Enrollments';
import { UpdateGradesDto } from 'src/Dto/UpdateGrades.dto';

@Injectable()
export class GradesService {
    constructor(
        @InjectRepository(Grades) private gradesRepository: Repository<Grades>,
        @InjectRepository(Enrollments) private enrollmentsRepository: Repository<Enrollments>,
    ) {}

    // Tüm notları getir
    async getAllGrades() {
        return await this.gradesRepository.find({
            relations: ['enrollments', 'enrollments.students', 'enrollments.course'], // İlişkili verileri getiriyoruz
        });
    }

    async findGradeById(id: number) {
        const grade = await this.gradesRepository.findOne({
            where: { id },
            relations: ['enrollments', 'enrollments.students', 'enrollments.course'],
        });

        if (!grade) {
            throw new HttpException('Grade not found', HttpStatus.NOT_FOUND);
        }

        return grade;
    }

    // Yeni bir not oluştur
    async createGrade(createGradeDto: CreateGradesDto) {
        const { grade_type, grade_value, enrollment_id } = createGradeDto;

        // İlgili kaydı (enrollment) kontrol et
        const enrollment = await this.enrollmentsRepository.findOne({
            where: { id: enrollment_id },
            relations: ['grades'],
        });

        if (!enrollment) {
            throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
        }

        // Yeni not oluştur
        const newGrade = this.gradesRepository.create(createGradeDto);
        const savedGrade = this.gradesRepository.save(newGrade)

        enrollment.grades.push(await savedGrade);  // daha temiz bir yol
        await this.enrollmentsRepository.save(enrollment);
        return await this.gradesRepository.save(newGrade);
    }


     // Not güncelleme işlemi
     async updateGrade(updateGradeDto: UpdateGradesDto) {
        const { grade_value, grade_type ,id} = updateGradeDto;

        // Not kaydını bul
        const grade = await this.gradesRepository.findOne({
            where: { id },
            relations: ['enrollments'],
        });

        if (!grade) {
            throw new HttpException('Grade not found', HttpStatus.NOT_FOUND);
        }

        // Güncelleme işlemi
        if (grade_value !== undefined) {
            grade.grade_value = grade_value;
        }

        if (grade_type) {
            grade.grade_type = grade_type;
        }

        // Güncellenmiş notu kaydet
        return await this.gradesRepository.save(grade);
    }
}
