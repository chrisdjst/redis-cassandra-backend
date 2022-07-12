import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Materia } from './entities/materia.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class MateriaRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private redisService: RedisService,
  ) {}

  materiaMapper: mapping.ModelMapper<Materia>;
  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Materia: {
          tables: ['materia'],
        },
      },
    };

    this.materiaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Materia');
  }

  async getMaterias() {
    return (await this.materiaMapper.findAll()).toArray();
  }

  async createMateria(materia: Materia) {
    const clientRedis = await this.redisService.createRedis();
    await clientRedis.json.set(materia.nome, '$', materia);
    return await this.materiaMapper.insert(materia);
  }

  async updateMateriaName(nome: string, materia: Materia) {
    materia.nome = nome;

    return await this.materiaMapper.update(materia, {
      fields: ['nome', 'nome', 'senha'],
      ifExists: true,
    });
  }

  async getMateriaByNome(nome: string) {
    return await this.materiaMapper.get({ nome: nome });
  }

  async getMateriaByRedis(nome: string) {
    const clientRedis = await this.redisService.createRedis();
    const materia = await clientRedis.json.get(nome);
    return materia;
  }
}
