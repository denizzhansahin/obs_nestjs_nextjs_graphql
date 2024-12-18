import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateInstructorDto } from 'src/Dto/CreateInstructors.dto';
import { UpdateInstructorDto } from 'src/Dto/UpdateInstructors.dto';
import { Instructors } from 'src/Entities/Instructors';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Instructors)
export class InstructorsGraphQl {
    constructor(private usersService: UsersService) {}

    @Query(() => [Instructors])
    getInstructors() {
        return this.usersService.getInstructors();
    }

    @Query(() => Instructors)
    getInstructorById(@Args('id') id: number) {
        return this.usersService.findInstructorById(id);
    }

    @Mutation(() => Instructors)
    createInstructors(
        @Args('createdInstructorsData') createdInstructorsData: CreateInstructorDto,
    ) {
        return this.usersService.createInstructors(createdInstructorsData);
    }

    @Mutation((returns) => Instructors)
    updateInstructors(
        @Args('userId') userId: number, // Güncellenecek kullanıcının ID'si
        @Args('updateInstructorsData') updateInstructorsData: UpdateInstructorDto, // Güncelleme verisi
    ) {
        return this.usersService.updateInstructors(userId, updateInstructorsData);
    }


    @Mutation(() => Boolean)
    async deleteInstructor(
      @Args('id', { type: () => Int }) id: number
    ): Promise<boolean> {
      try {
        await this.usersService.deleteInstructor(id);
        return true; // Silme başarılı
      } catch (error) {
        console.error(error);
        return false; // Silme başarısız
      }
    }
}
