import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { GradesService } from 'src/grades/grades.service';
import { CreateGradesDto } from 'src/Dto/CreateGrades.dto';
import { Grades } from 'src/Entities/Grades';

@Resolver(() => Grades)
export class GradesResolver {
    constructor(private readonly gradesService: GradesService) {}

    // Tüm notları getir (Query)
    @Query(() => [Grades], { name: 'getAllGrades' })
    async getAllGrades() {
        return await this.gradesService.getAllGrades();
    }

    // Yeni bir not oluştur (Mutation)
    @Mutation(() => Grades, { name: 'createGrade' })
    async createGrade(
        @Args('createGradeInput') createGradesDto: CreateGradesDto,
    ): Promise<Grades> {
        return await this.gradesService.createGrade(createGradesDto);
    }
}
