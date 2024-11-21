import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateInstructorDto } from 'src/Dto/CreateInstructors.dto';
import { Instructors } from 'src/Entities/Instructors';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Instructors)
export class InstructorsGraphQl {
    constructor(private usersService: UsersService) {}

    @Query(() => [Instructors])
    getInstructors() {
        return this.usersService.getInstructors();
    }

    @Mutation(() => Instructors)
    createInstructors(
        @Args('createdInstructorsData') createdInstructorsData: CreateInstructorDto,
    ) {
        return this.usersService.createInstructors(createdInstructorsData);
    }
}
