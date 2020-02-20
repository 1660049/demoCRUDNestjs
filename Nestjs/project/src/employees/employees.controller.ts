import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { EmployeesService } from './employees.service';
import { CreateNewEmployeeInput, UpdateEmployeeInput } from './employees.interface';
@Controller('employees')
export class EmployeesController {
  constructor(
    @Inject(EmployeesService) private readonly employeesService: EmployeesService
   ){}
  @GrpcMethod('EmployeesService')
  async createNewEmployee(data: {createNewEmployeeInput : CreateNewEmployeeInput}, metadata: any){
    const result = await this.employeesService.createNewEmployee(
      data.createNewEmployeeInput
    );
    return { code: 200, message: 'create employee success', result};
  }

  @GrpcMethod('EmployeesService')
  async updateEmployee(data: {updateEmployeeInput: UpdateEmployeeInput}){
    const result = await this.employeesService.updateEmployee(
      data.updateEmployeeInput
    );
    return { code: 200, message: 'update employee success', result};
  }

  @GrpcMethod('EmployeesService')
  async deleteEmployee(data: {deleteEmployeeInput: UpdateEmployeeInput}){
    const result = await this.employeesService.deleteEmployee(
      data.deleteEmployeeInput
    );
    return { code: 200, message: 'delete employee success', result};
  }

}
