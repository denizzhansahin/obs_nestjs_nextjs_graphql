import { Test, TestingModule } from '@nestjs/testing';
import { CourseInstructorsService } from './course_instructors.service';

describe('CourseInstructorsService', () => {
  let service: CourseInstructorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseInstructorsService],
    }).compile();

    service = module.get<CourseInstructorsService>(CourseInstructorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
