import { Injectable } from '@nestjs/common';
import { MatriculaRepository } from './matricula.repository';
import { Matricula } from './entities/matricula.entity';

@Injectable()
export class MatriculaService {
  constructor(private cursoRepository: MatriculaRepository) {}

  async getMatricula() {
    return this.cursoRepository.getMatricula();
  }

  async createMatricula(matricula: Matricula) {
    return this.cursoRepository.createMatricula(matricula);
  }

  async updateMatricula(email: string, matricula: Matricula) {
    return this.cursoRepository.updateMatricula(email, matricula);
  }

  async getMatriculaByEmail(email: string) {
    return this.cursoRepository.getMatriculaByEmail(email);
  }

  async getMatriculaByRedis(email: string) {
    return this.cursoRepository.getMatriculaByRedis(email);
  }
}
