import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCoursesDto } from "src/Dto/CreateCourses.dto";
import { UpdateCoursesDto } from "src/Dto/UpdateCourse.dto";
import { Courses } from "src/Entities/Courses";
import { Repository } from "typeorm";


@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Courses) private coursesRepository: Repository<Courses>,
    ) { }

    // Dersleri getir
    async getCourses() {
        return await this.coursesRepository.find({relations:['enrollments','courseInstructors','courseInstructors.instructor']});  // Asenkron hale getirdik
    }

    // Yeni ders oluştur
    async createCourses(createCourseData: CreateCoursesDto) {
        const newCourse = this.coursesRepository.create(createCourseData);
        return await this.coursesRepository.save(newCourse);  // Asenkron hale getirdik
    }

    //ders güncelle
    async updateCourse(id: number, updateCourseData: UpdateCoursesDto) {
        const course = await this.coursesRepository.findOneBy({ id: id });
        if (!course) {
            throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
        }

        Object.assign(course, updateCourseData);

        return await this.coursesRepository.save(course);
    }
}