import { RegistroAulaService } from './registro_aula.service';
import { RegistroAulaController } from './registro_aula.controller';
import { Module } from '@nestjs/common';
import { RegistroAulaRepository } from './registro_aula.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';

@Module({
  imports: [CassandraModule],
  controllers: [RegistroAulaController],
  providers: [RegistroAulaService, RegistroAulaRepository],
  exports: [RegistroAulaService, RegistroAulaRepository],
})
export class RegistroAulaModule {}
