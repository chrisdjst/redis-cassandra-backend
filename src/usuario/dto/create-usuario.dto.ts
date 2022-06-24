import { Usuario } from '../entities/usuario.entity';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDTO extends Usuario {
  @IsString()
  nome: string;

  @MinLength(4)
  senha: string;

  @IsEmail()
  email: string;

  @IsString()
  cpf: string;

  @IsString()
  tipo_usuario: string;
}
