import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Module } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [CassandraModule, RedisModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
  exports: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
