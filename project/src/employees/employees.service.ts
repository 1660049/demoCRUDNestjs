import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entity/employee.entity';
import { Repository } from 'typeorm';
import { CreateNewEmployeeInput, UpdateEmployeeInput, DeleteEmployeeInput, GetOneEmployeeInput } from './employees.interface';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) { }

  async getAll(): Promise<Employee[]> {
    return this.employeesRepository.find();
  }
  
  async getOne(eInput: GetOneEmployeeInput): Promise<Employee>{
    return this.employeesRepository.findOne({id: eInput.id});
  }

  async createNewEmployee(newEmployee: CreateNewEmployeeInput) {
    await this.employeesRepository.save(newEmployee);
  }

  async updateEmployee(eInput: UpdateEmployeeInput) {
    try {
      const currentE: Employee = await this.employeesRepository.findOne({ id: eInput.id });
      if (currentE) {
        {
          await this.employeesRepository.update(eInput.id, eInput);
        }
      }
    } catch (error) {
      throw new RpcException({code: 404, message: 'Employee is not exists'})
    }

  }

  async deleteEmployee(eInput: DeleteEmployeeInput) {
    try {
      const now = new Date();
      const currentE = await this.employeesRepository.findOne({ where: { id: eInput.id, deletedAt: null } });
      if (currentE) {
        await this.employeesRepository.update(eInput.id, { deletedAt: now });
      }
    } catch (error) {
      throw new RpcException({ code: 404, message: 'Employee is not exists' });
    }

  }
}
