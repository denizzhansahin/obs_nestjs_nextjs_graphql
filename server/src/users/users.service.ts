import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInstructorDto } from 'src/Dto/CreateInstructors.dto';
import { CreateStudentDto } from 'src/Dto/CreateStudent.dto';
import { CreateUserDto } from 'src/Dto/CreatUser.dto';
import { UpdateInstructorDto } from 'src/Dto/UpdateInstructors.dto';
import { UpdateStudentDto } from 'src/Dto/UpdateStudent.dto';
import { UpdateUserDto } from 'src/Dto/UpdateUser.dto';
import { CourseInstructors } from 'src/Entities/CourseInstructors';
import { Enrollments } from 'src/Entities/Enrollments';
import { Instructors } from 'src/Entities/Instructors';
import { Student } from 'src/Entities/Student';
import { User } from 'src/Entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Student) private studentRepository: Repository<Student>,
        @InjectRepository(Instructors) private instructorsRepository: Repository<Instructors>,
        @InjectRepository(CourseInstructors) private courseInstructorsRepository: Repository<CourseInstructors>,
        @InjectRepository(Enrollments) private enrollmentsRepository: Repository<Enrollments>,
    ) { }

    // Kullanıcıları getir
    async getUsers() {
        return await this.usersRepository.find({ relations: ['student', 'instructors'] });  // Asenkron hale getirdik
    }

    //tek kullanıcı getir
    async findById(id: number): Promise<User> {
        return await this.usersRepository.findOne({
            where: { id },
            relations: ['student', 'instructors'], // İlgili ilişkileri dahil edin
        });
    }

    // Yeni kullanıcı oluştur
    async createUser(createUserData: CreateUserDto) {
        const newUser = this.usersRepository.create(createUserData);
        return await this.usersRepository.save(newUser);  // Asenkron hale getirdik
    }

    //Kullanıcı güncelle
    async updateUser(userId: number, updateUserData: UpdateUserDto) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Gelen bilgileri mevcut kullanıcı üzerine merge ediyoruz
        Object.assign(user, updateUserData);

        // Güncellenmiş kullanıcıyı kaydediyoruz
        return await this.usersRepository.save(user);
    }

    // Öğrencileri getir
    async getStudent() {
        return await this.studentRepository.find({
            relations: ['user', 'enrollments', 'enrollments.course', 'enrollments.grades'],  // enrollments ve içindeki course ilişkisini de alıyoruz
        }); // Asenkron hale getirdik
    }

    async findStudentById(id: number): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: { userId: id },
            relations: ['user', 'enrollments', 'enrollments.course', 'enrollments.grades'],
        });

        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }

        return student;
    }




    // Öğrencinin enrollments ilişkilerini kaldırma
    async removeStudentEnrollments(userId: number): Promise<void> {
        await this.studentRepository
            .createQueryBuilder()
            .relation(Student, "enrollments")
            .of(userId)
            .set([]); // İlişkileri kaldır
    }

    // Öğrenci kaydını silme
    async deleteStudent(userId: number): Promise<void> {
        await this.studentRepository.delete(userId); // Öğrenci kaydını sil
    }




    // Yeni öğrenci oluştur
    async createStudent(createdStudentData: CreateStudentDto) {
        // User var mı kontrol et
        const findUser = await this.usersRepository.findOneBy({ id: createdStudentData.userId });
        if (!findUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);  // Hata mesajını HttpException ile döndürüyoruz
        }

        // Yeni öğrenci oluştur
        const newStudent = this.studentRepository.create(createdStudentData);
        const savedStudent = await this.studentRepository.save(newStudent);

        findUser.student = savedStudent
        await this.usersRepository.save(findUser)

        return savedStudent;
    }

    //Öğrenci güncelle
    async updateStudent(userId: number, updateStudentData: UpdateStudentDto) {
        const student = await this.studentRepository.findOneBy({ userId: userId });
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }

        Object.assign(student, updateStudentData);

        return await this.studentRepository.save(student);
    }

    //Akademisyen Getir
    async getInstructors() {
        return await this.instructorsRepository.find({ relations: ['user', 'courseInstructors', 'courseInstructors.course'] })
    }

    async findInstructorById(id: number): Promise<Instructors> {
        const instructor = await this.instructorsRepository.findOne({
            where: { userId: id },
            relations: ['user', 'courseInstructors', 'courseInstructors.course'],
        });

        if (!instructor) {
            throw new HttpException('Instructor not found', HttpStatus.NOT_FOUND);
        }

        return instructor;
    }

    //Akademisyen oluştur
    async createInstructors(createdInstructorsData: CreateInstructorDto) {
        const findUser = await this.usersRepository.findOneBy({ id: createdInstructorsData.userId });
        if (!findUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);  // Hata mesajını HttpException ile döndürüyoruz
        }

        // Yeni akademisyen oluştur
        const newInstructors = this.instructorsRepository.create(createdInstructorsData);
        const savedInstructors = await this.instructorsRepository.save(newInstructors);

        findUser.instructors = savedInstructors
        await this.usersRepository.save(findUser)

        return savedInstructors;
    }

    //Akademisyen güncelle
    async updateInstructors(userId: number, updateInstructorsData: UpdateInstructorDto) {
        const instructors = await this.instructorsRepository.findOneBy({ userId: userId });
        if (!instructors) {
            throw new HttpException('Instructors not found', HttpStatus.NOT_FOUND);
        }

        Object.assign(instructors, updateInstructorsData);

        return await this.instructorsRepository.save(instructors);
    }

    //akademisyen silme
    async deleteInstructor(instructorId: number): Promise<void> {
        // İlk olarak, ilişkili CourseInstructors ve Enrollments kayıtlarını güncelliyoruz
        // CourseInstructors ile ilişkiyi NULL yapıyoruz
        await this.courseInstructorsRepository.update(
            { instructor: { userId: instructorId } },
            { instructor: null }
        );

        // Enrollments ile ilişkiyi NULL yapıyoruz
        await this.enrollmentsRepository.update(
            { academician: { userId: instructorId } },
            { academician: null }
        );

        // Şimdi instructor'ı silebiliriz
        await this.instructorsRepository.delete(instructorId);
    }


}
