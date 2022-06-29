import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Matricula } from './entities/matricula.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class MatriculaRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private redisService: RedisService,
  ) {}

  matriculaMapper: mapping.ModelMapper<Matricula>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Matricula: {
          tables: ['Matricula'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.matriculaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Matricula');
  }

  async getMatricula() {
    return (await this.matriculaMapper.findAll()).toArray();
  }

  async createMatricula(matricula: Matricula) {
    return (await this.matriculaMapper.insert(matricula)).toArray();
  }

  async updateMatricula(num_matricula: number, matricula: Matricula) {
    matricula.num_matricula = num_matricula;

    return (
      await this.matriculaMapper.update(matricula, {
        fields: ['nome', 'descricao', 'carga_horaria'],
        ifExists: true,
      })
    ).toArray();
  }

  async getMatriculaByNumMatricula(num_matricula: number) {
    return (await this.matriculaMapper.find({ num_matricula: num_matricula })).toArray();
  }

  async getMatriculaByRedis(num_matricula: number) {
    const clientRedis = await this.redisService.createRedis();
    const matricula = await clientRedis.json.get(num_matricula);
    return matricula;
  }
}
