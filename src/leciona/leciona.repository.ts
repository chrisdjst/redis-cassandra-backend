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
          tables: ['Leciona'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.lecionaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Leciona');
  }

  async getLeciona() {
    return (await this.lecionaMapper.findAll()).toArray();
  }

  async createLeciona(leciona: Leciona) {
    return (await this.lecionaMapper.insert(leciona)).toArray();
  }

  async updateLeciona(email: string, leciona: Leciona) {
    leciona.email = email;

    return (
      await this.lecionaMapper.update(leciona, {
        fields: ['nome', 'descricao', 'carga_horaria'],
        ifExists: true,
      })
    ).toArray();
  }

  async getLecionaByNumLeciona(email: string) {
    return (await this.lecionaMapper.find({ email: email })).toArray();
  }

  async getLecionaByRedis(email: string) {
    const clientRedis = await this.redisService.createRedis();
    const leciona = await clientRedis.json.get(email);
    return leciona;
  }
}
