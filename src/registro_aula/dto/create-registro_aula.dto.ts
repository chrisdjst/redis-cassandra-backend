import { RegistroAula } from '../entities/registro_aula.entity';
import { IsEmail, IsString } from 'class-validator';

export class CreateRegistroAulaDTO extends RegistroAula {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  curso: string;

  @IsString()
  materia: string;

  @IsString()
  turma: string;

  @IsString()
  dt_aula: string;

  @IsString()
  descricao_aula: string;
}
