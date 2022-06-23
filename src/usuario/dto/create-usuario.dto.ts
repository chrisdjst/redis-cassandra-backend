import { Usuario } from '../entities/usuario.entity';
import {
  IsEmail,
  IsInt,
  IsString,
  Matches,
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

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  senha: string;

  @IsEmail()
  email: string;

  @IsString()
  cpf: string;

  @IsInt()
  tipo_usuario: number;
}
