import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Usuario } from './entities/usuario.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class UsuarioRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

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
    return (await this.usuarioMapper.insert(usuario)).toArray();
  }

  async updateUsuarioName(email: string, usuario: Usuario) {
    usuario.email = email;

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
}
