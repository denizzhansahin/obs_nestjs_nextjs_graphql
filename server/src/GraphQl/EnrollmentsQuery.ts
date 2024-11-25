import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEnrollmentsDto } from 'src/Dto/CreateEnrollments.dto';
import { CreateUserDto } from 'src/Dto/CreatUser.dto';
import { UpdateEnrollmentsDto } from 'src/Dto/UpdateEnrollments.dto';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { Enrollments } from 'src/Entities/Enrollments';

@Resolver(() => Enrollments)
export class EnrollmentsGraphQl {
    constructor(private enrollmentsService: EnrollmentsService) { }
    @Query(() => [Enrollments])
    getEnrollments() {
        return this.enrollmentsService.getEnrollments()
    }

    @Query(() => Enrollments, { name: 'findEnrollmentById' })
    async findEnrollmentById(@Args('id') id: number) {
        return this.enrollmentsService.findEnrollmentById(id);
    }

    @Mutation((returns) => Enrollments)
    createEnrollments(
        @Args('createdEnrollmentsData') createdEnrollmentsData: CreateEnrollmentsDto,
    ) {
        return this.enrollmentsService.createEnrollments(createdEnrollmentsData)
    }

    @Mutation((returns) => Enrollments)
    updateEnrollments(
        @Args('id') id: number, // Güncellenecek kullanıcının ID'si
        @Args('updateEnrollmentsData') updateEnrollmentsData: UpdateEnrollmentsDto, // Güncelleme verisi
    ) {
        return this.enrollmentsService.updateEnrollment(id, updateEnrollmentsData);
    }

    @Mutation((returns) => Enrollments)
    updateEnrollments_kisitli(
        @Args('id') id: number, // Güncellenecek kullanıcının ID'si
        @Args('updateEnrollmentsData') updateEnrollmentsData: UpdateEnrollmentsDto, // Güncelleme verisi
    ) {
        return this.enrollmentsService.updateEnrollment_kisitli(id, updateEnrollmentsData);
    }
}
