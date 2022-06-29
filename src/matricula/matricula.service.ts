import { Injectable } from '@nestjs/common';
import { MatriculaRepository } from './matricula.repository';
import { Matricula } from './entities/matricula.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class MatriculaService {
  constructor(private cursoRepository: MatriculaRepository) {}

  async getMatricula() {
    return this.cursoRepository.getMatricula();
  }

  async createMatricula(matricula: Matricula) {
    return this.cursoRepository.createMatricula(matricula);
  }

  async updateMatricula(num_matricula: number, matricula: Matricula) {
    return this.cursoRepository.updateMatricula(num_matricula, matricula);
  }

  async getMatriculaByNumMatricula(num_matricula: number) {
    return this.cursoRepository.getMatriculaByNumMatricula(num_matricula);
  }

  async getMatriculaByRedis(num_matricula: number) {
    return this.cursoRepository.getMatriculaByRedis(num_matricula);
  }
}
