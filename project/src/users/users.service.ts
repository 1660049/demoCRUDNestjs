import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateNewUserInput, UpdateUserInput, DeleteUserInput } from './users.interface';
import { RpcException } from '@nestjs/microservices';
import { Employee } from 'src/entity/employee.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createNewUser(newUser: CreateNewUserInput) {
        try {
            const result = await this.userRepository.findOne({where:[ {identityNumber: newUser.indentityNumber}, {phoneNumber: newUser.phoneNumber}]})
            if(!result){
                await this.userRepository.save(newUser);
            }
        } catch (error) {
            throw new RpcException({ code: 400, message: 'indentityNumber or phoneNumber exists' });
        }
    }

    async updateUser(data: UpdateUserInput) {
        try {
            const result = await this.userRepository.findOne({ where: { id: data.id, deletedAt: null } });
            if (result) {
                await this.userRepository.update(data.id, data);
            }
        } catch (error) {
            throw new RpcException({ code: 409, message: 'user is not exists' });
        }
    }

    async deleteUser(data: DeleteUserInput) {
        try {
            const result = await this.userRepository.findOne({ where: { id: data.id, deletedAt: null } });
            const now = new Date();
            if (result) {
                await this.userRepository.update(data.id, { deletedAt: now })
            }
        } catch (error) {
            throw new RpcException({ code: 409, message: 'user is not exists' });
        }
    }

}
