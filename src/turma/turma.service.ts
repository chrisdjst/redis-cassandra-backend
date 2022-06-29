import { Injectable } from '@nestjs/common';
import { TurmaRepository } from './turma.repository';
import { Turma } from './entities/turma.entity';

@Injectable()
export class TurmaService {
  constructor(private turmaRepository: TurmaRepository) {}

  async getTurmas() {
    return this.turmaRepository.getTurmas();
  }

  async createTurma(turma: Turma) {
    return this.turmaRepository.createTurma(turma);
  }

  async updateTurmaCodTurma(cod_turma: string, turma: Turma) {
    return this.turmaRepository.updateTurmaCodTurma(cod_turma, turma);
  }

  async getTurmaByCodTurma(cod_turma: string) {
    return this.turmaRepository.getTurmaByCodTurma(cod_turma);
  }

  async getTurmaByRedis(cod_turma: string) {
    return this.turmaRepository.getTurmaByRedis(cod_turma);
  }
}
