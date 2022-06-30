import { LecionaService } from './leciona.service';
import { LecionaController } from './leciona.controller';
import { Module } from '@nestjs/common';
import { LecionaRepository } from './leciona.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [CassandraModule, RedisModule],
  controllers: [LecionaController],
  providers: [LecionaService, LecionaRepository],
  exports: [LecionaService, LecionaRepository],
})
export class LecionaModule {}
