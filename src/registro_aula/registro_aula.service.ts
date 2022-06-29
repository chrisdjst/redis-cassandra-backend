import { Injectable } from '@nestjs/common';
import { RegistroAulaRepository } from './registro_aula.repository';
import { RegistroAula } from './entities/registro_aula.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class RegistroAulaService {
  constructor(private aulaRepository: RegistroAulaRepository) {}

  async getRegistroAula() {
    return this.aulaRepository.getAula();
  }

  async createRegistroAula(aula: RegistroAula) {
    return this.aulaRepository.createRegistroAula(aula);
  }

  async updateRegistroAulaEmail(email: string, aula: RegistroAula) {
    return this.aulaRepository.updateRegistroAulaEmail(email, aula);
  }

  async getRegistroAulaByEmail(email: string) {
    return this.aulaRepository.getRegistroAulaByEmail(email);
  }

  async getRegistroAulaByRedis(email: string) {
    return this.aulaRepository.getRegistroAulaByRedis(email);
  }
}
