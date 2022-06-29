import { Turma } from '../entities/turma.entity';
import { IsString } from 'class-validator';

export class UpdateTurmaDTO extends Turma {
  @IsString()
  dt_inicio: string;

  @IsString()
  dt_fim: string;
}
