import { Injectable } from '@nestjs/common';
import { LecionaRepository } from './leciona.repository';
import { Leciona } from './entities/leciona.entity';

@Injectable()
export class LecionaService {
  constructor(private lecionaRepository: LecionaRepository) {}

  async getLeciona() {
    return this.lecionaRepository.getLeciona();
  }

  async createLeciona(leciona: Leciona) {
    return this.lecionaRepository.createLeciona(leciona);
  }

  async updateLeciona(email: string, leciona: Leciona) {
    return this.lecionaRepository.updateLeciona(email, leciona);
  }

  async getLecionaByEmail(email: string) {
    return this.lecionaRepository.getLecionaByEmail(email);
  }

  async getLecionaByRedis(email: string) {
    return this.lecionaRepository.getLecionaByRedis(email);
  }
}
