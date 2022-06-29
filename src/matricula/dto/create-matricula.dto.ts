import { Matricula } from '../entities/matricula.entity';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateMatriculaDTO extends Matricula {
  @IsInt()
  num_matricula: number;

  @IsEmail()
  email_aluno: string;

  @IsString()
  cod_curso: string;

  @IsString()
  materia: string;

  @IsString()
  turma: string;

  @IsString()
  dt_ingresso: string;
  
}