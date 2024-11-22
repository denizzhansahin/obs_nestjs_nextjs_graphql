import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGradesDto } from 'src/Dto/CreateGrades.dto';
import { Grades } from 'src/Entities/Grades';
import { Enrollments } from 'src/Entities/Enrollments';

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
}
