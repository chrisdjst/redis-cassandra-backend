import { Turma } from '../entities/turma.entity';
import { IsString } from 'class-validator';

export class CreateTurmaDTO extends Turma {
  @IsString()
  cod_turma: string;

  @IsString()
  dt_inicio: string;

  @IsString()
  dt_fim: string;
}
