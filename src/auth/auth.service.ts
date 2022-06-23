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
      sub: usuario.cod_usuario,
      email: usuario.email,
      name: usuario.nome,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(login: string, senha: string): Promise<Usuario[]> {
    const usuario = await this.usuarioService.getUsuarioByLogin(login);
    //return usuario;
    if (usuario) {
      //const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

      if (senha == usuario[senha]) {
        return {
          ...usuario,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
