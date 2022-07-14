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
          tables: ['matricula'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.matriculaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Matricula');
  }

  async getMatricula() {
    const clientRedis = await this.redisService.createRedis();
    const matricula = await clientRedis.ft.search('matricula', '*');
    return matricula.documents;
  }

  async createMatricula(matricula: Matricula) {
    const objMatricula = {
      email: matricula.email,
      num_matricula: matricula.num_matricula,
      dt_ingresso: matricula.dt_ingresso,
      turma: matricula.turma,
      curso: matricula.curso,
    };
    const clientRedis = await this.redisService.createRedis();
    await clientRedis.json.set(
      'matricula/' + matricula.email,
      '$',
      objMatricula,
    );
    return 'Cadastrado com sucesso';
  }

  async updateMatricula(email: string, matricula: Matricula) {
    matricula.email = email;

    return (
      await this.matriculaMapper.update(matricula, {
        fields: ['turma'],
        ifExists: true,
      })
    ).toArray();
  }

  async getMatriculaByEmail(email: string) {
    return (await this.matriculaMapper.find({ email: email })).toArray();
  }

  async getMatriculaByRedis(email: string) {
    const clientRedis = await this.redisService.createRedis();
    const matricula = await clientRedis.json.get(email);
    return matricula;
  }
}
