import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEnrollmentsDto } from 'src/Dto/CreateEnrollments.dto';
import { UpdateEnrollmentsDto } from 'src/Dto/UpdateEnrollments.dto';
import { CourseInstructors } from 'src/Entities/CourseInstructors';
import { Courses } from 'src/Entities/Courses';
import { Enrollments } from 'src/Entities/Enrollments';
import { Instructors } from 'src/Entities/Instructors';
import { Student } from 'src/Entities/Student';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
        @InjectRepository(Enrollments) private enrollmentsRepository: Repository<Enrollments>,
        @InjectRepository(Courses) private coursesRepository: Repository<Courses>,
        @InjectRepository(Instructors) private instructorRepository: Repository<Instructors>, // Akademisyen repository'sini ekledik,
        @InjectRepository(CourseInstructors) private courseInstructorsRepository: Repository<CourseInstructors>

    ) { }

    // Kayıt getir
    /*
    async getEnrollments() {
        return await this.enrollmentsRepository.find({ relations: ['students', 'course','grades'] });  // Asenkron hale getirdik
    }
        */

    async getEnrollments() {
        return await this.enrollmentsRepository.find({
            relations: ['students', 'course', 'grades', 'course.courseInstructors', 'course.courseInstructors.instructor', 'academician'],
        });

    }

    async findEnrollmentById(id: number): Promise<Enrollments> {
        const enrollment = await this.enrollmentsRepository.findOne({
            where: { id },
            relations: ['students', 'course', 'grades', 'course.courseInstructors', 'course.courseInstructors.instructor', 'academician'],
        });
    
        if (!enrollment) {
            throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
        }
    
        return enrollment;
    }
    

    // Yeni kayıt oluştur
    async createEnrollments_eski(createdEnrollmentsData: CreateEnrollmentsDto) {
        const findStudent = await this.studentRepository.findOne({
            where: { userId: createdEnrollmentsData.student_id },
            relations: ['enrollments'],
        });
        if (!findStudent) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }

        const findCourse = await this.coursesRepository.findOne({
            where: { id: createdEnrollmentsData.course_id },
            relations: ['enrollments', 'courseInstructors', 'courseInstructors.instructor'],
        });
        if (!findCourse) {
            throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
        }

        console.log(findCourse)



        // Akademisyen bilgisi var mı?
        let academician = null;
        if (createdEnrollmentsData.academician_id) {
            // Akademisyen, CourseInstructors ile ilişkilendirilmiş olmalı
            const courseInstructor = await this.courseInstructorsRepository.findOne({
                where: {
                    course: { id: createdEnrollmentsData.course_id },
                    instructor: { userId: createdEnrollmentsData.academician_id }
                },
                relations: ['course', 'instructor',], // course ve instructor ilişkilerini dahil et
            });

            // Eğer courseInstructor verisi varsa ancak course veya instructor eksikse, hata döndürme
            if (!courseInstructor) {
                throw new HttpException('Academician not found for the given course', HttpStatus.NOT_FOUND);
            }

            // Eğer instructor veya course bilgisi eksikse, yine hata döndürme
            if (!courseInstructor.instructor) {
                throw new HttpException('Instructor data is missing', HttpStatus.NOT_FOUND);
            }

            // Akademisyen bilgisi varsa, bunu al
            academician = courseInstructor.instructor;
        }




        /*
        let academician = null;
        if (createdEnrollmentsData.academician_id) {
            academician = await this.instructorRepository.findOne({
                where: { userId: createdEnrollmentsData.academician_id },
            });
            if (!academician) {
                throw new HttpException('Academician not found', HttpStatus.NOT_FOUND);
            }
        }


        */
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


        // Yeni enrollment oluşturuluyor
        const newEnrollment = this.enrollmentsRepository.create({
            ...createdEnrollmentsData,
            students: [findStudent],  // Tek bir öğrenci değil, öğrenci dizisi olmalı
            course: findCourse,
            academician: academician, // Akademisyen bilgisini ilişkilendiriyoruz
        });
        const savedEnrollment = await this.enrollmentsRepository.save(newEnrollment);

        // Öğrenci kaydına enrollments ekleniyor
        findStudent.enrollments = [...(findStudent.enrollments || []), savedEnrollment];
        await this.studentRepository.save(findStudent);

        // Kurs kaydına enrollments ekleniyor
        //findCourse.enrollments = [...(findCourse.enrollments || []), savedEnrollment];
        findCourse.enrollments.push(savedEnrollment);
        await this.coursesRepository.save(findCourse);
        console.log("Kaydedilen kayıt:", savedEnrollment);
        console.log("Kaydedilen kayıt:", findStudent);


        return savedEnrollment;
    }

    async createEnrollments(createEnrollmentsData: CreateEnrollmentsDto): Promise<Enrollments> {
        // Öğrenci kontrolü
        const findStudent = await this.studentRepository.findOne({
            where: { userId: createEnrollmentsData.student_id },
            //relations: ['enrollments'],
        });
        if (!findStudent) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
    
        // Kurs kontrolü
        const findCourse = await this.coursesRepository.findOne({
            where: { id: createEnrollmentsData.course_id },
            //relations: ['enrollments', 'courseInstructors', 'courseInstructors.instructor'],
        });
        if (!findCourse) {
            throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
        }
    
        // Akademisyen kontrolü (isteğe bağlı)
        let academician = null;
        if (createEnrollmentsData.academician_id) {
            const courseInstructor = await this.courseInstructorsRepository.findOne({
                where: {
                    course: { id: createEnrollmentsData.course_id },
                    instructor: { userId: createEnrollmentsData.academician_id },
                },
                relations: ['course', 'instructor'],
            });
    
            if (!courseInstructor || !courseInstructor.instructor) {
                throw new HttpException(
                    'Academician not associated with the given course',
                    HttpStatus.NOT_FOUND,
                );
            }
    
            academician = courseInstructor.instructor;
        }
    
        // Yeni kayıt oluştur
        const newEnrollment = this.enrollmentsRepository.create({
            ...createEnrollmentsData,
            students: [findStudent], // Many-to-Many ilişki
            course: findCourse,
            academician,
        });
    
        const savedEnrollment = await this.enrollmentsRepository.save(newEnrollment);
    
        // İlgili kayıtları güncelle
        findStudent.enrollments = [...(findStudent.enrollments || []), savedEnrollment];
        await this.studentRepository.save(findStudent);
    
        findCourse.enrollments = [...(findCourse.enrollments || []), savedEnrollment];
        await this.coursesRepository.save(findCourse);
    
        return savedEnrollment;
    }

    


    async updateEnrollment(enrollmentId: number, updateData: UpdateEnrollmentsDto): Promise<Enrollments> {
        console.log(updateData.academician_id)
        // Mevcut kayıt bulunuyor
        const enrollment = await this.enrollmentsRepository.findOne({
            where: { id: enrollmentId },
            relations: ['students', 'course', 'academician'],
        });

        if (!enrollment) {
            throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
        }

        // Gelen course_id varsa kursu güncelle
        if (updateData.course_id) {
            const course = await this.coursesRepository.findOne({ where: { id: updateData.course_id } });
            if (!course) {
                throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
            }
            enrollment.course = course;
        }

        // Gelen student_id varsa öğrenciyi güncelle
        if (updateData.student_id) {
            const student = await this.studentRepository.findOne({ where: { userId: updateData.student_id } });
            if (!student) {
                throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
            }
            enrollment.students = [student]; // Öğrenci güncelleniyor
        }

        // Gelen academician_id varsa akademisyeni güncelle
        if (updateData.academician_id) {
            console.log(updateData.academician_id)
            // Akademisyen bilgisi var mı?
            let academician = null;
            if (updateData.academician_id) {
                console.log(updateData.academician_id)
                // Akademisyen, CourseInstructors ile ilişkilendirilmiş olmalı
                const courseInstructor = await this.courseInstructorsRepository.findOne({
                    where: {
                        course: { id: updateData.course_id },
                        instructor: { userId: updateData.academician_id }
                    },
                    relations: ['course', 'instructor',], // course ve instructor ilişkilerini dahil et
                });

                // Eğer courseInstructor verisi varsa ancak course veya instructor eksikse, hata döndürme
                if (!courseInstructor) {
                    throw new HttpException('Academician not found for the given course', HttpStatus.NOT_FOUND);
                }

                // Eğer instructor veya course bilgisi eksikse, yine hata döndürme
                if (!courseInstructor.instructor) {
                    throw new HttpException('Instructor data is missing', HttpStatus.NOT_FOUND);
                }

                // Akademisyen bilgisi varsa, bunu al
                academician = courseInstructor.instructor;
                enrollment.academician = academician;
                console.log(updateData.academician_id)
                console.log(academician)
            }
        }

        // Status ve enrollment_date gibi doğrudan güncellenebilir alanlar
        if (updateData.status) {
            enrollment.status = updateData.status;
        }
        if (updateData.enrollment_date) {
            enrollment.enrollment_date = updateData.enrollment_date;
        }

        // Güncellenmiş veriyi kaydet
        return this.enrollmentsRepository.save(enrollment);
    }

    async updateEnrollment_kisitli(
        id: number,
        updateEnrollmentsData: UpdateEnrollmentsDto
    ): Promise<Enrollments> {
        // Enrollment kaydını buluyoruz
        const enrollment = await this.enrollmentsRepository.findOne({
            where: { id },
            relations: ['course', 'students', 'academician'],
        });

        if (!enrollment) {
            throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
        }

        // Öğrenci ve kurs bilgisi değişmeyecek, sadece diğer alanlar güncellenecek.
        if (updateEnrollmentsData.enrollment_date) {
            enrollment.enrollment_date = updateEnrollmentsData.enrollment_date;
        }
        if (updateEnrollmentsData.status) {
            enrollment.status = updateEnrollmentsData.status;
        }
        if (updateEnrollmentsData.academician_id) {
            // Akademisyen ID'si verildiğinde, akademisyen bilgisi de güncellenir
            // Gelen academician_id varsa akademisyeni güncelle
        if (updateEnrollmentsData.academician_id) {
            console.log(updateEnrollmentsData.academician_id)
            // Akademisyen bilgisi var mı?
            let academician = null;
            if (updateEnrollmentsData.academician_id) {
                console.log(updateEnrollmentsData.academician_id)
                // Akademisyen, CourseInstructors ile ilişkilendirilmiş olmalı
                const courseInstructor = await this.courseInstructorsRepository.findOne({
                    where: {
                        course: { id: updateEnrollmentsData.course_id },
                        instructor: { userId: updateEnrollmentsData.academician_id }
                    },
                    relations: ['course', 'instructor',], // course ve instructor ilişkilerini dahil et
                });

                // Eğer courseInstructor verisi varsa ancak course veya instructor eksikse, hata döndürme
                if (!courseInstructor) {
                    throw new HttpException('Academician not found for the given course', HttpStatus.NOT_FOUND);
                }

                // Eğer instructor veya course bilgisi eksikse, yine hata döndürme
                if (!courseInstructor.instructor) {
                    throw new HttpException('Instructor data is missing', HttpStatus.NOT_FOUND);
                }

                // Akademisyen bilgisi varsa, bunu al
                academician = courseInstructor.instructor;
                enrollment.academician = academician;
                console.log(updateEnrollmentsData.academician_id)
                console.log(academician)
            }
        }

        }

        // Güncellenen kaydı kaydediyoruz
        return this.enrollmentsRepository.save(enrollment);
    }


    async deleteEnrollment(id: number): Promise<string> {
        const enrollment = await this.enrollmentsRepository.findOne({ where: { id } });

        if (!enrollment) {
            throw new NotFoundException(`Enrollment with ID ${id} not found`);
        }

        // Enrollment kaydını sil (Grade kayıtları otomatik silinir)
        await this.enrollmentsRepository.delete(id);

        return `Enrollment with ID ${id} and its related grades were deleted successfully`;
    }
}
