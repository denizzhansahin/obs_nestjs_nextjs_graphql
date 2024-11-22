import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CourseInstructors } from 'src/Entities/CourseInstructors';
import { CreateCourseInstructorDto } from 'src/Dto/CreateCourseInstructor.dto';
import { Courses } from 'src/Entities/Courses';
import { Instructors } from 'src/Entities/Instructors';

@Injectable()
export class CourseInstructorsService {
  constructor(
    @InjectRepository(CourseInstructors)
    private readonly courseInstructorsRepository: Repository<CourseInstructors>,
    @InjectRepository(Courses)
    private readonly coursesRepository: Repository<Courses>,
    @InjectRepository(Instructors)
    private readonly instructorsRepository: Repository<Instructors>,
  ) {}

  async getCourseInstructors() {
    return await this.courseInstructorsRepository.find({
      relations: ['course', 'instructor'], // İlişkili kurs ve öğretim görevlisini de al
    });
  }

  async create(createCourseInstructorDto: CreateCourseInstructorDto): Promise<CourseInstructors> {
    const { courseId, instructorId, assigned_date } = createCourseInstructorDto;

    // İlgili course ve instructor'ı yükle
    const course = await this.coursesRepository.findOne({ where: { id: courseId }, relations: ['courseInstructors'] });
    if (!course) {
      throw new Error('Course not found');
    }
  
    const instructor = await this.instructorsRepository.findOne({ where: { userId: instructorId }, relations: ['courseInstructors'] });
    if (!instructor) {
      throw new Error('Instructor not found');
    }
  
    // Yeni atamayı oluştur
    const newAssignment = this.courseInstructorsRepository.create({
      course,
      instructor,
      assigned_date,
    });
  
    // Course ve Instructor içindeki courseInstructors ilişkilerini güncelle
    course.courseInstructors.push(newAssignment); // course'a yeni atama ekle
    instructor.courseInstructors.push(newAssignment); // instructor'a yeni atama ekle
  
    // Kurs ve öğretim görevlisini kaydet
    await this.coursesRepository.save(course);
    await this.instructorsRepository.save(instructor);
  
        // Bu değişiklikleri bir işlem (transaction) içinde kaydet
        return this.courseInstructorsRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            // İlk olarak kurs ve öğretim görevlisini güncelle
            course.courseInstructors.push(newAssignment);
            instructor.courseInstructors.push(newAssignment);
      
            // Ardından, yeni atamayı kaydet
            await transactionalEntityManager.save(course);
            await transactionalEntityManager.save(instructor);
            return transactionalEntityManager.save(newAssignment);
          });
        }
  }

