import { Usuario } from '../entities/usuario.entity';
import {
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDTO extends Usuario {
  @IsInt()
  cod_usuario: number;

  @IsString()
  nome: string;

  @IsString()
  login: string;

  @MinLength(4)
  senha: string;

  email: string;

  @IsString()
  cpf: string;

  @IsInt()
  tipo_usuario: number;
}
