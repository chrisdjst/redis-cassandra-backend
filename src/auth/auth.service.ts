import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async login(usuario: Usuario): Promise<UserToken> {
    const payload: UserPayload = {
      email: usuario.email,
      name: usuario.nome,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, senha: string): Promise<Usuario> {
    const usuario = await this.usuarioService.getUsuarioByEmail(email);
    if (usuario) {
      if (senha == usuario['senha']) {
        return {
          ...usuario,
        };
      }
    }

    throw new UnauthorizedError('Email ou senha está incorreto.');
  }
}
