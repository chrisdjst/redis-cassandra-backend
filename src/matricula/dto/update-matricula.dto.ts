import { Matricula } from '../entities/matricula.entity';
import { IsString } from 'class-validator';

export class UpdateMatriculaDTO extends Matricula {
  @IsString()
  turma: string;
}
