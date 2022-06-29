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

  async createCurso(aula: Curso) {
    return this.cursoRepository.createCurso(aula);
  }

  async updateCursoCodCurso(cod_curso: string, aula: Curso) {
    return this.cursoRepository.updateCursoCodCurso(cod_curso, aula);
  }

  async getCursoByCodCurso(cod_curso: string) {
    return this.cursoRepository.getCursoByCodCurso(cod_curso);
  }

  async getCursoByRedis(materia: string) {
    return this.cursoRepository.getCursoByRedis(materia);
  }
}
