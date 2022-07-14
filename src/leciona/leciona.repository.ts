import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Leciona } from './entities/leciona.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class LecionaRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private redisService: RedisService,
  ) {}

  lecionaMapper: mapping.ModelMapper<Leciona>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Leciona: {
          tables: ['leciona'],
        },
      },
    };

    this.lecionaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Leciona');
  }

  async getLeciona() {
    const clientRedis = await this.redisService.createRedis();
    const leciona = await clientRedis.ft.search('leciona', '*');
    return leciona.documents;
  }

  async createLeciona(leciona: Leciona) {
    const objLeciona = {
      email: leciona.email,
      tipo_usuario: leciona.tipo_usuario,
      materias: [
        {
          dt_inicio: leciona.dt_inicio,
          dt_fim: leciona.dt_fim,
          turma: leciona.turma,
          curso: leciona.curso,
          materia: leciona.materia,
        },
      ],
    };

    const clientRedis = await this.redisService.createRedis();
    await clientRedis.json.set('leciona/' + leciona.email, '$', objLeciona);
    return 'Cadastrado com sucesso';
  }

  async updateLeciona(email: string, leciona: Leciona) {
    const client = await this.redisService.createRedis();
    return await client.json.arrAppend(
      'leciona/' + email,
      '.materias',
      leciona,
    );
  }

  async getLecionaByEmail(email: string) {
    return await this.lecionaMapper.get({ email: email });
  }

  async getLecionaByRedis(email: string) {
    const clientRedis = await this.redisService.createRedis();
    const leciona = await clientRedis.json.get('leciona/' + email);
    return leciona;
  }
}
