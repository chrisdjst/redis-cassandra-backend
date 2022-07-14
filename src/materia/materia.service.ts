import { Injectable } from '@nestjs/common';
import { MateriaRepository } from './materia.repository';
import { Materia } from './entities/materia.entity';

@Injectable()
export class MateriaService {
  constructor(private materiaRepository: MateriaRepository) {}

  async getMaterias() {
    return this.materiaRepository.getMaterias();
  }

  async createMateria(materia: Materia) {
    return this.materiaRepository.createMaterias(materia);
  }

  async updateMateriaName(nome: string, materia: Materia) {
    return this.materiaRepository.updateMateriaName(nome, materia);
  }

  async getMateriaByNome(nome: string) {
    return this.materiaRepository.getMateriaByNome(nome);
  }

  async getMateriaByRedis(nome: string) {
    return this.materiaRepository.getMateriaByRedis(nome);
  }
}
