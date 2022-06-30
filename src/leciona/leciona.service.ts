import { Injectable } from '@nestjs/common';
import { LecionaRepository } from './leciona.repository';
import { Leciona } from './entities/leciona.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class LecionaService {
  constructor(private cursoRepository: LecionaRepository) {}

  async getLeciona() {
    return this.cursoRepository.getLeciona();
  }

  async createLeciona(leciona: Leciona) {
    return this.cursoRepository.createLeciona(leciona);
  }

  async updateLeciona(email: string, leciona: Leciona) {
    return this.cursoRepository.updateLeciona(email, leciona);
  }

  async getLecionaByNumLeciona(email: string) {
    return this.cursoRepository.getLecionaByNumLeciona(email);
  }

  async getLecionaByRedis(email: string) {
    return this.cursoRepository.getLecionaByRedis(email);
  }
}
