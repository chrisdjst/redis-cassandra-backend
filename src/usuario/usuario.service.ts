import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './entities/usuario.entity';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async getUsuarios() {
    return this.usuarioRepository.getUsuarios();
  }

  async getUsuarioById(id: number) {
    return this.usuarioRepository.getUsuarioById(id);
  }

  async createUsuario(usuario: Usuario) {
    return this.usuarioRepository.createUsuario(usuario);
  }

  async updateUsuarioName(id: number, name: string) {
    return this.usuarioRepository.updateUsuarioName(id, name);
  }

  async getUsuarioByEmail(email: string) {
    return this.usuarioRepository.getUsuarioByEmail(email);
  }
}
