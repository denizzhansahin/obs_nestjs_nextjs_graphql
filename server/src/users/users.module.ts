import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/Entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGraphQl } from 'src/GraphQl/UserQuery';
import { StudentGraphQl } from 'src/GraphQl/StudentQuery';
import { Student } from 'src/Entities/Student';

@Module({
  controllers: [],
  providers: [UsersService,UserGraphQl,StudentGraphQl],
  exports: [UsersService],
  imports:[
    TypeOrmModule.forFeature([User,Student])
  ]
})

export class UsersModule {}
