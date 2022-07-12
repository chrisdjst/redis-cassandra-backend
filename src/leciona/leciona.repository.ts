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
    return (await this.lecionaMapper.findAll()).toArray();
  }

  async createLeciona(leciona: Leciona) {
    const clientRedis = await this.redisService.createRedis();
    await clientRedis.json.set(
      'leciona/' + leciona.email + '/materia ' + leciona.materia,
      '$',
      leciona,
    );
    return await this.lecionaMapper.insert(leciona);
  }

  async updateLeciona(email: string, leciona: Leciona) {
    leciona.email = email;

    const client = await this.redisService.createRedis();
    await client.json.arrAppend('leciona/' + email, '$', email);

    return await this.lecionaMapper.update(leciona, {
      fields: ['nome', 'descricao', 'carga_horaria'],
      ifExists: true,
    });
  }

  async getLecionaByEmail(email: string) {
    return await this.lecionaMapper.get({ email: email });
  }

  async getLecionaByRedis(email: string) {
    const clientRedis = await this.redisService.createRedis();
    const leciona = await clientRedis.json.get(email);
    return leciona;
  }
}
