import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInstructorDto } from 'src/Dto/CreateInstructors.dto';
import { CreateStudentDto } from 'src/Dto/CreateStudent.dto';
import { CreateUserDto } from 'src/Dto/CreatUser.dto';
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
    ) { }

    // Kullanıcıları getir
    async getUsers() {
        return await this.usersRepository.find({ relations: ['student', 'instructors'] });  // Asenkron hale getirdik
    }

    // Yeni kullanıcı oluştur
    async createUser(createUserData: CreateUserDto) {
        const newUser = this.usersRepository.create(createUserData);
        return await this.usersRepository.save(newUser);  // Asenkron hale getirdik
    }

    // Öğrencileri getir
    async getStudent() {
        return await this.studentRepository.find({
            relations: ['user', 'enrollments', 'enrollments.course','enrollments.grades'],  // enrollments ve içindeki course ilişkisini de alıyoruz
        }); // Asenkron hale getirdik
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

    //Akademisyen Getir
    async getInstructors() {
        return await this.instructorsRepository.find({ relations: ['user','courseInstructors','courseInstructors.course'] })
    }

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
}
