import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from 'src/Dto/CreatUser.dto';
import { User } from 'src/Entities/User';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/Dto/UpdateUser.dto';

@Resolver(() => User)
export class UserGraphQl {
    constructor(private usersService:UsersService){}
    @Query(()=>[User])
    getUsers(){
        return this.usersService.getUsers()
    }

    @Mutation((returns)=>User)
    createUser(
        @Args('createdUserData') createdUserData : CreateUserDto,
    ) {
        return this.usersService.createUser(createdUserData)
    }

    @Mutation((returns) => User)
    updateUser(
        @Args('userId') userId: number, // Güncellenecek kullanıcının ID'si
        @Args('updateUserData') updateUserData: UpdateUserDto, // Güncelleme verisi
    ) {
        return this.usersService.updateUser(userId, updateUserData);
    }
}