import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import {CreateNewUserInput, UpdateUserInput, DeleteUserInput} from './users.interface';
import { RpcException } from '@nestjs/microservices';
import { Employee } from 'src/entity/employee.entity';

@Injectable()
export class UsersService {
    constructor(
         @InjectRepository(UserEntity)
         private readonly userRepository : Repository<UserEntity>
    ){}

    async createNewUser(newUser: CreateNewUserInput) {
        const result = await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect(Employee,'employee','user.employeeID = employee.id')
        .getOne();

        if(result) {
            await this.userRepository.save(newUser);
        } else {
            throw new RpcException({code: 409, message: 'employeeId is not exists' });
        }
              
    }

    async updateUser(data: UpdateUserInput){
        const result = await this.userRepository.findOne({where: {id: data.id, deletedAt: null}});
        if(result){
            await this.userRepository.update(data.id, data);
        }else{
            throw new RpcException({code: 409, message: 'user is not exists' });
        }
    }

    async deleteUser(data: DeleteUserInput){
        const result = await this.userRepository.findOne({where: {id: data.id, deletedAt: null}});
        const now = new Date();
        if(result){
            await this.userRepository.update(data.id,{deletedAt: now})
        }else{
            throw new RpcException({code: 409, message: 'user is not exists'});
        }
    }
}
