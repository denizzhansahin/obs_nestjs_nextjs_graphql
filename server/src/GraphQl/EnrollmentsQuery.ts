import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEnrollmentsDto } from 'src/Dto/CreateEnrollments.dto';
import { CreateUserDto } from 'src/Dto/CreatUser.dto';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { Enrollments } from 'src/Entities/Enrollments';

@Resolver(() => Enrollments)
export class EnrollmentsGraphQl {
    constructor(private enrollmentsService:EnrollmentsService){}
    @Query(()=>[Enrollments])
    getEnrollments(){
        return this.enrollmentsService.getEnrollments()
    }

    @Mutation((returns)=>Enrollments)
    createEnrollments(
        @Args('createdEnrollmentsData') createdEnrollmentsData : CreateEnrollmentsDto,
    ) {
        return this.enrollmentsService.createEnrollments(createdEnrollmentsData)
    }
}
