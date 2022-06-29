import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { Module } from '@nestjs/common';
import { TurmaRepository } from './turma.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [CassandraModule, RedisModule],
  controllers: [TurmaController],
  providers: [TurmaService, TurmaRepository],
  exports: [TurmaService, TurmaRepository],
})
export class TurmaModule {}
