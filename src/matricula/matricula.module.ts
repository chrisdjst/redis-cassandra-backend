import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { Module } from '@nestjs/common';
import { MatriculaRepository } from './matricula.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [CassandraModule, RedisModule],
  controllers: [MatriculaController],
  providers: [MatriculaService, MatriculaRepository],
  exports: [MatriculaService, MatriculaRepository],
})
export class MatriculaModule {}
