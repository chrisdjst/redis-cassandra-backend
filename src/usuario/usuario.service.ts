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

  async createUsuario(usuario: Usuario) {
    return this.usuarioRepository.createUsuario(usuario);
  }

  async updateUsuarioName(email: string, usuario: Usuario) {
    return this.usuarioRepository.updateUsuarioName(email, usuario);
  }

  async getUsuarioByEmail(email: string) {
    return this.usuarioRepository.getUsuarioByEmail(email);
  }
}
