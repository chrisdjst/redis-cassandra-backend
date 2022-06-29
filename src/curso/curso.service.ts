import { Injectable } from '@nestjs/common';
import { CursoRepository } from './curso.repository';
import { Curso } from './entities/curso.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class CursoService {
  constructor(private cursoRepository: CursoRepository) {}

  async getCurso() {
    return this.cursoRepository.getCurso();
  }

  async createCurso(curso: Curso) {
    return this.cursoRepository.createCurso(curso);
  }

  async updateCurso(cod_curso: string, curso: Curso) {
    return this.cursoRepository.updateCurso(cod_curso, curso);
  }

  async getCursoByCodCurso(cod_curso: string) {
    return this.cursoRepository.getCursoByCodCurso(cod_curso);
  }

  async getCursoByRedis(materia: string) {
    return this.cursoRepository.getCursoByRedis(materia);
  }
}
