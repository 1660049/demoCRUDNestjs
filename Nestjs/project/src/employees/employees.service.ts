import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entity/employee.entity';
import { Repository } from 'typeorm';
import { CreateNewEmployeeInput, UpdateEmployeeInput, DeleteEmployeeInput } from './employees.interface';
import { RpcException } from '@nestjs/microservices';
import { isNull } from 'util';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) { }

  async getAll(): Promise<Employee[]> {
    return this.employeesRepository.find();
  }

  async createNewEmployee(newEmployee: CreateNewEmployeeInput) {
    await this.employeesRepository.save(newEmployee);
  }

  async updateEmployee(eInput: UpdateEmployeeInput) {
    const currentE: Employee = await this.employeesRepository.findOne({ id: eInput.id });
    if (currentE) {
      {
        await this.employeesRepository.update(eInput.id, eInput);
      }
    }
    else {
      throw new RpcException({ code: 409, message: 'Employee is not exists' });
    }
  }

  async deleteEmployee(eInput: DeleteEmployeeInput) {
    const now = new Date();
    console.log(now);
    const currentE = await this.employeesRepository.findOne({where:{id: eInput.id, deletedAt: null}});
    if(currentE) {
        await this.employeesRepository.update(eInput.id,{deletedAt: now});
      }else{
        throw new RpcException({ code: 409, message: 'Employee is not exists'});
      }
  }
}
