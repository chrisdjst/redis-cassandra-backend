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

  async updateRegistroAulaMateria(materia: string, aula: RegistroAula) {
    aula.materia = materia;

    return (
      await this.aulaMapper.update(aula, {
        fields: ['materia', 'turma', 'curso'],
        ifExists: true,
      })
    ).toArray();
  }

  async getRegistroAulaByMateria(materia: string) {
    return (await this.aulaMapper.find({ materia: materia })).toArray();
  }

  async getRegistroAulaByRedis(materia: string) {
    const clientRedis = await this.redisService.createRedis();
    const usuario = await clientRedis.json.get(materia);
    return usuario;
  }
}
