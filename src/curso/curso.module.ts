import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { Module } from '@nestjs/common';
import { CursoRepository } from './curso.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [CassandraModule, RedisModule],
  controllers: [CursoController],
  providers: [CursoService, CursoRepository],
  exports: [CursoService, CursoRepository],
})
export class CursoModule {}
