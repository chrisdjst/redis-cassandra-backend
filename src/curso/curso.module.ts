import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { Module } from '@nestjs/common';
import { CursoRepository } from './curso.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';

@Module({
  imports: [CassandraModule],
  controllers: [CursoController],
  providers: [CursoService, CursoRepository],
  exports: [CursoService, CursoRepository],
})
export class CursoModule {}
