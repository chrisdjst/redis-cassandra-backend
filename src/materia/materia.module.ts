import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { Module } from '@nestjs/common';
import { MateriaRepository } from './materia.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [CassandraModule, RedisModule],
  controllers: [MateriaController],
  providers: [MateriaService, MateriaRepository],
  exports: [MateriaService, MateriaRepository],
})
export class MateriaModule {}
