import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Usuario } from './entities/usuario.entity';
//import * as bcrypt from 'bcrypt';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
//import { CreateUsuarioDTO } from './dto/create-usuario.dto';

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
  async getUsuarioById(id: number) {
    return (await this.usuarioMapper.find({ cod_usuario: id })).toArray();
  }

  async createUsuario(usuario: Usuario) {
    return (await this.usuarioMapper.insert(usuario)).toArray();

    //async createUsuario(usuario: Usuario): Promise<Usuario> {
    //usuario.senha = await bcrypt.hash(usuario.senha, 10);
    //return (await this.usuarioMapper.insert(usuario)).toArray();
  }

  async updateUsuarioName(id: number, name: string) {
    const usuario = new Usuario();
    usuario.cod_usuario = id;
    usuario.nome = name;

    return (
      await this.usuarioMapper.update(usuario, {
        fields: ['cod_usuario', 'nome'],
        ifExists: true,
      })
    ).toArray();
  }

  async getUsuarioByEmail(email: string) {
    return (await this.usuarioMapper.find([(email = email)])).toArray();
  }
}
