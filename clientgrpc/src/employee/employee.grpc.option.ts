import { ClientOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';
import {join} from 'path';

export const microservicesOptions: ClientOptions = {
    transport: Transport.GRPC,
  options: {
    package: 'employee_ms',
    protoPath: join(__dirname, '/protobufs/employee_ms.proto'),
    url: 'localhost: 50051'
  },
}