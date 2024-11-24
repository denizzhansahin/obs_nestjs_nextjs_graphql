import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentDto } from 'src/Dto/CreateStudent.dto';
import { UpdateStudentDto } from 'src/Dto/UpdateStudent.dto';
import { Student } from 'src/Entities/Student';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Student)
export class StudentGraphQl {
    constructor(private usersService: UsersService) {}

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
}
