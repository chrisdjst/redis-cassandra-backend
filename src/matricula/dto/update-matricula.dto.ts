import { Matricula } from '../entities/matricula.entity';
import { IsString } from 'class-validator';

export class UpdateMatriculaDTO extends Matricula {
  @IsString()
  turma: string;

  @IsString()
  curso: string;

  @IsString()
  dt_ingresso: string;
}
