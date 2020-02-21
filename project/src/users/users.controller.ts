import { Controller, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateNewUserInput, UpdateUserInput, DeleteUserInput } from './users.interface';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(UsersService)
        private readonly usersService: UsersService
    ){}

    @GrpcMethod('EmployeesService')
    async createNewUser(data: {createNewUserInput : CreateNewUserInput}){
        const result = await this.usersService.createNewUser(data.createNewUserInput);
        return {code: 200, message: 'update user success', result};
    }

    @GrpcMethod('EmployeesService')
    async updateUser(data: {updateUserInput : UpdateUserInput}){
        const result = await this.usersService.updateUser(data.updateUserInput);
        return {code:200, message: 'update user success',result};
    }

    @GrpcMethod('EmployeesService')
    async deleteUser(data: {deleteUserInput : DeleteUserInput}){
        const result = await this.usersService.deleteUser(data.deleteUserInput);
        return {code:200, message: 'update user success',result};
    }
}
