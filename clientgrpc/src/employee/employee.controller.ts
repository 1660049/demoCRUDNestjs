import { Controller, OnModuleInit, Post, Get, Inject, Body } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microservicesOptions } from './employee.grpc.option';
import { EmployeesService , CreateNewEmployeeInput} from './employee.interface';

@Controller('employee')
export class EmployeeController implements OnModuleInit {
    
    @Client(microservicesOptions)
    private client: ClientGrpc;

    private grpcService: EmployeesService;

    onModuleInit(){
        this.grpcService = this.client.getService<EmployeesService>('EmployeesService');
    }
    
    @Get()
    async getAll(): Promise<any>{
        return  this.grpcService.getAllEmployee({});
    }


    @Post()
    async createNewEmployee(@Body() data : CreateNewEmployeeInput){
        console.log("lhuiyhiuyiuoy", data);
        return this.grpcService.createNewEmployee(data);
    }
}
