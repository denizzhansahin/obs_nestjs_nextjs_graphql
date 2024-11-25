import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentDto } from 'src/Dto/CreateStudent.dto';
import { UpdateStudentDto } from 'src/Dto/UpdateStudent.dto';
import { Student } from 'src/Entities/Student';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Student)
export class StudentGraphQl {
    constructor(private usersService: UsersService) { }

    @Query(() => [Student])
    getStudents() {
        return this.usersService.getStudent();
    }

    @Query(() => Student)
    getStudentById(@Args('id') id: number) {
        return this.usersService.findStudentById(id);
    }

    @Mutation(() => Student)
    createStudent(
        @Args('createdStudentData') createdStudentData: CreateStudentDto,
    ) {
        return this.usersService.createStudent(createdStudentData);
    }

    @Mutation((returns) => Student)
    updateStudent(
        @Args('userId') userId: number, // Güncellenecek kullanıcının ID'si
        @Args('updateStudentData') updateStudentData: UpdateStudentDto, // Güncelleme verisi
    ) {
        return this.usersService.updateStudent(userId, updateStudentData);
    }

    @Mutation(() => Boolean)
    async deleteStudent(
        @Args('userId', { type: () => Int }) userId: number,
    ): Promise<boolean> {
        // Öğrenciyi ilgili ilişkileriyle birlikte bul
        const student = await this.usersService.findStudentById(userId);
    
        if (!student) {
            throw new Error(`Student with ID ${userId} not found`);
        }
    
        try {
            // Junction table'daki ilişkileri kaldır (ManyToMany ilişkisi için)
            if (student.enrollments && student.enrollments.length > 0) {
                await this.usersService.removeStudentEnrollments(userId);
            }
    
            // Öğrenciyi sil
            await this.usersService.deleteStudent(userId);
    
            return true; // Başarı durumu
        } catch (error) {
            console.error(`Error deleting student with ID ${userId}:`, error);
            throw new Error(`Failed to delete student with ID ${userId}`);
        }
    }
    
    
    

}
