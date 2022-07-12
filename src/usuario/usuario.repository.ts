import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Usuario } from './entities/usuario.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class UsuarioRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService, private redisService: RedisService) {}

  usuarioMapper: mapping.ModelMapper<Usuario>;
  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Usuario: {
          tables: ['usuario'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.usuarioMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Usuario');
  }

  async getUsuarios() {
    return (await this.usuarioMapper.findAll()).toArray();
  }

  async createUsuario(usuario: Usuario) {
    let usuarioRedis = {
      nome: usuario.nome,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario
    }
    const clientRedis = await this.redisService.createRedis()
    await clientRedis.json.set('usuario/'+usuario.email, '$', usuarioRedis)
    console.log(usuarioRedis)
    return (await this.usuarioMapper.insert(usuario)).toArray();
  }

  async updateUsuarioName(email: string, usuario: Usuario) {
    usuario.email = email;

    const client = await this.redisService.createRedis()
    await client.json.arrAppend('usuario/'+email, '$', usuario)

    return (
      await this.usuarioMapper.update(usuario, {
        fields: ['email', 'nome', 'senha'],
        ifExists: true,
      })
    ).toArray();
  }

  async getUsuarioByEmail(email: string) {
    return (await this.usuarioMapper.find({ email: email })).toArray();
  }

  async getUserByRedis(email: string) {
    const clientRedis = await this.redisService.createRedis()
    const usuario = await clientRedis.json.get(email)
    return usuario
  }
}
