import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';


import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { User } from './Entities/User';
import { UserGraphQl } from './GraphQl/UserQuery';
import { StudentGraphQl } from './GraphQl/StudentQuery';
import { Student } from './Entities/Student';

@Module({
  imports: [UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile:'src/schema.gql'
    }),
    TypeOrmModule.forRoot({ //veya getCongig
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      logging: true,
      entities: [User,Student],
      migrations: [],
      subscribers: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService,UserGraphQl,StudentGraphQl],
})
export class AppModule {}
