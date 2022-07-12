import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { RegistroAula } from './entities/registro_aula.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class RegistroAulaRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private redisService: RedisService,
  ) {}

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
    const clientRedis = await this.redisService.createRedis();
    await clientRedis.json.set('aula/' + aula.materia, '$', aula);
    return await this.aulaMapper.insert(aula);
  }

  async updateRegistroAulaMateria(materia: string, aula: RegistroAula) {
    aula.materia = materia;

    const client = await this.redisService.createRedis();
    await client.json.arrAppend('aula/' + materia, '$', materia);

    return await this.aulaMapper.update(aula, {
      fields: ['materia', 'turma', 'curso'],
      ifExists: true,
    });
  }

  async getRegistroAulaByMateria(materia: string) {
    return await this.aulaMapper.get({ materia: materia });
  }

  async getRegistroAulaByRedis(materia: string) {
    const clientRedis = await this.redisService.createRedis();
    const usuario = await clientRedis.json.get(materia);
    return usuario;
  }
}
