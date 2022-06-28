import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CassandraModule } from './common/cassandra/cassandra.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedisModule } from './common/redis/redis.module';

@Module({
  imports: [CassandraModule, UsuarioModule, AuthModule, RedisModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
