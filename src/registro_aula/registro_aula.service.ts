import { Injectable } from '@nestjs/common';
import { RegistroAulaRepository } from './registro_aula.repository';
import { RegistroAula } from './entities/registro_aula.entity';

@Injectable()
export class RegistroAulaService {
  constructor(private aulaRepository: RegistroAulaRepository) {}

  async getRegistroAula() {
    return this.aulaRepository.getAula();
  }

  async createRegistroAula(aula: RegistroAula) {
    return this.aulaRepository.createRegistroAula(aula);
  }

  async updateRegistroAulaMateria(materia: string, aula: RegistroAula) {
    return this.aulaRepository.updateRegistroAulaMateria(materia, aula);
  }

  async getRegistroAulaByMateria(materia: string) {
    return this.aulaRepository.getRegistroAulaByMateria(materia);
  }

  async getRegistroAulaByRedis(materia: string) {
    return this.aulaRepository.getRegistroAulaByRedis(materia);
  }
}
