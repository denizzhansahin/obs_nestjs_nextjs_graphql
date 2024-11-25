import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CourseInstructors } from 'src/Entities/CourseInstructors';
import { CreateCourseInstructorDto } from 'src/Dto/CreateCourseInstructor.dto';
import { Courses } from 'src/Entities/Courses';
import { Instructors } from 'src/Entities/Instructors';
import { UpdateCourseInstructorDto } from 'src/Dto/UpdateCourseInstructors.dto';

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

  async getCourseInstructorById(id: number): Promise<CourseInstructors> {
    const courseInstructor = await this.courseInstructorsRepository.findOne({
      where: { id },
      relations: ['course', 'instructor'], // İlgili ilişkileri de alıyoruz
    });
  
    if (!courseInstructor) {
      throw new Error('CourseInstructor not found');
    }
  
    return courseInstructor;
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

      

        async update(updateCourseInstructorDto: UpdateCourseInstructorDto): Promise<CourseInstructors> {
          const { id, courseId, instructorId, assigned_date } = updateCourseInstructorDto;
      
          // Mevcut CourseInstructors kaydını bul
          const courseInstructor = await this.courseInstructorsRepository.findOne({ where: { id }, relations: ['course', 'instructor'] });
          if (!courseInstructor) {
            throw new Error('CourseInstructor not found');
          }
      
          // Güncelleme için kurs ve öğretim görevlisini yükle
          if (courseId) {
            const course = await this.coursesRepository.findOne({ where: { id: courseId } });
            if (!course) {
              throw new Error('Course not found');
            }
            courseInstructor.course = course;
          }
      
          if (instructorId) {
            const instructor = await this.instructorsRepository.findOne({ where: { userId: instructorId } });
            if (!instructor) {
              throw new Error('Instructor not found');
            }
            courseInstructor.instructor = instructor;
          }
      
          if (assigned_date) {
            courseInstructor.assigned_date = assigned_date;
          }
      
          // Güncellenmiş CourseInstructor'ı kaydet
          return this.courseInstructorsRepository.save(courseInstructor);
        }


        async deleteCourseInstructor(id: number): Promise<void> {
          const courseInstructor = await this.courseInstructorsRepository.findOne({
            where: { id },
            relations: ['course', 'instructor'], // İlişkili veriler
          });
          
          if (!courseInstructor) {
            throw new Error('CourseInstructor not found');
          }
      
          // İlişkili verilerin null yapılması
          courseInstructor.course = null;
          courseInstructor.instructor = null;
      
          // CourseInstructors kaydını silme
          await this.courseInstructorsRepository.save(courseInstructor); // Veriyi null yaparak kaydet
          await this.courseInstructorsRepository.remove(courseInstructor);  // Sonrasında silme işlemi
        }
      
  }

