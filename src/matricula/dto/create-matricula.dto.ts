import { Matricula } from '../entities/matricula.entity';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateMatriculaDTO extends Matricula {
  @IsInt()
  num_matricula: number;

  @IsEmail()
  email: string;

  @IsString()
  curso: string;

  @IsString()
  turma: string;

  @IsString()
  dt_ingresso: string;

  @IsString()
  disciplina: string;
}
