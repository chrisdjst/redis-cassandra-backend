import { Leciona } from '../entities/leciona.entity';
import { IsString } from 'class-validator';

export class UpdateLecionaDTO extends Leciona {
  @IsString()
  dt_inicio: string;

  @IsString()
  turma: string;

  @IsString()
  materia: string;

  @IsString()
  curso: string;

  @IsString()
  dt_fim: string;
}
