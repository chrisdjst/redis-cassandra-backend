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
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
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

  async updateRegistroAulaEmail(email: string, aula: RegistroAula) {
    aula.email = email;

    return (
      await this.aulaMapper.update(aula, {
        fields: ['email', 'turma', 'curso'],
        ifExists: true,
      })
    ).toArray();
  }

  async getRegistroAulaByEmail(email: string) {
    return (await this.aulaMapper.find({ email: email })).toArray();
  }

  async getRegistroAulaByRedis(email: string) {
    const clientRedis = await this.redisService.createRedis();
    const usuario = await clientRedis.json.get(email);
    return usuario;
  }
}
