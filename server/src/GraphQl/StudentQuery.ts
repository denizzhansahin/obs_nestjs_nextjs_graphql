import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentDto } from 'src/Dto/CreateStudent.dto';
import { Student } from 'src/Entities/Student';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Student)
export class StudentGraphQl {
    constructor(private usersService: UsersService) {}

    @Query(() => [Student])
    getStudents() {
        return this.usersService.getStudent();
    }

    @Mutation(() => Student)
    createStudent(
        @Args('createdStudentData') createdStudentData: CreateStudentDto,
    ) {
        return this.usersService.createStudent(createdStudentData);
    }
}
