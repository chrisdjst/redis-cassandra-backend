import { Usuario } from '../entities/usuario.entity';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDTO extends Usuario {
  @IsString()
  nome: string;

  @IsString()
  @MinLength(4)
  senha: string;
}
