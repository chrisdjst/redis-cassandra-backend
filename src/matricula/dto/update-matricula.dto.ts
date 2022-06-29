import { Matricula } from '../entities/matricula.entity';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class UpdateMatriculaDTO extends Matricula {
  @IsString()
  materia: string;

  @IsString()
  turma: string;
}
