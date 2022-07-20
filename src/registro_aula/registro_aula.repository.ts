import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { RegistroAula } from './entities/registro_aula.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class RegistroAulaRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  aulaMapper: mapping.ModelMapper<RegistroAula>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        RegistroAula: {
          tables: ['registroaula'],
        },
      },
    };

    this.aulaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('RegistroAula');
  }

  async getAula() {
    return (await this.aulaMapper.findAll()).toArray();
  }

  async createRegistroAula(aula: RegistroAula) {
    return (await this.aulaMapper.insert(aula)).toArray();
  }

  async updateRegistroAulaMateria(
    materia: string,
    curso: string,
    dt_aula: string,
    aula: RegistroAula,
  ) {
    aula.materia = materia;
    aula.curso = curso;
    aula.dt_aula = dt_aula;

    return (
      await this.aulaMapper.update(aula, {
        fields: ['materia', 'curso', 'dt_aula', 'turma', 'descricao_aula'],
        ifExists: true,
      })
    ).toArray();
  }

  async getRegistroAulaByMateria(materia: string) {
    return (await this.aulaMapper.find({ materia: materia })).toArray();
  }
}
