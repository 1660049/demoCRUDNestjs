import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import {join} from 'path';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.GRPC,
    options: {
      package: 'employee_ms',
      protoPath: join(__dirname, 'protobufs/employee_ms.proto'),
      url: 'localhost:50051',
    },
  });
  await app.listenAsync();
}
bootstrap();
