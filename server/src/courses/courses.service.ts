import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCoursesDto } from "src/Dto/CreateCourses.dto";
import { Courses } from "src/Entities/Courses";
import { Repository } from "typeorm";


@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Courses) private coursesRepository: Repository<Courses>,
    ) { }

    // Dersleri getir
    async getCourses() {
        return await this.coursesRepository.find();  // Asenkron hale getirdik
    }

    // Yeni ders oluştur
    async createCourses(createCourseData: CreateCoursesDto) {
        const newCourse = this.coursesRepository.create(createCourseData);
        return await this.coursesRepository.save(newCourse);  // Asenkron hale getirdik
    }
}