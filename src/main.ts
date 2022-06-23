import { NestFactory } from '@nestjs/core';
//import { EmployeeModule } from './employee/employee.module';
import { ValidationPipe } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';

async function bootstrap() {
  const app = await NestFactory.create(UsuarioModule);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
