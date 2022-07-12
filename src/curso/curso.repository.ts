import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Curso } from './entities/curso.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class CursoRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private redisService: RedisService,
  ) {}

  cursoMapper: mapping.ModelMapper<Curso>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Curso: {
          tables: ['curso'],
        },
      },
    };

    this.cursoMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Curso');
  }

  async getCurso() {
    return (await this.cursoMapper.findAll()).toArray();
  }

  async createCurso(curso: Curso) {
    return await this.cursoMapper.insert(curso);
  }

  async updateCurso(cod_curso: string, curso: Curso) {
    curso.cod_curso = cod_curso;

    return await this.cursoMapper.update(curso, {
      fields: ['nome', 'descricao', 'carga_horaria'],
      ifExists: true,
    });
  }

  async getCursoByCodCurso(cod_curso: string) {
    return await await this.cursoMapper.get({ cod_curso: cod_curso });
  }

  async getCursoByRedis(cod_curso: string) {
    const clientRedis = await this.redisService.createRedis();
    const curso = await clientRedis.json.get(cod_curso);
    return curso;
  }
}
