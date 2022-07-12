import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Turma } from './entities/turma.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class TurmaRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private redisService: RedisService,
  ) {}

  turmaMapper: mapping.ModelMapper<Turma>;
  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Turma: {
          tables: ['turma'],
        },
      },
    };

    this.turmaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Turma');
  }

  async getTurmas() {
    return (await this.turmaMapper.findAll()).toArray();
  }

  async createTurma(turma: Turma) {
    const clientRedis = await this.redisService.createRedis();
    await clientRedis.json.set(turma.cod_turma, '$', turma);
    return await this.turmaMapper.insert(turma);
  }

  async updateTurmaCodTurma(cod_turma: string, turma: Turma) {
    turma.cod_turma = cod_turma;

    const client = await this.redisService.createRedis();
    await client.json.arrAppend('turma/' + cod_turma, '$', cod_turma);

    return await this.turmaMapper.update(turma, {
      fields: ['cod_turma', 'dt_inicio', 'dt_fim'],
      ifExists: true,
    });
  }

  async getTurmaByCodTurma(cod_turma: string) {
    return await this.turmaMapper.get({ cod_turma: cod_turma });
  }

  async getTurmaByRedis(cod_turma: string) {
    const clientRedis = await this.redisService.createRedis();
    const turma = await clientRedis.json.get(cod_turma);
    return turma;
  }
}
