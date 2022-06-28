import { RegistroAula } from '../entities/registro_aula.entity';
import { IsString } from 'class-validator';

export class UpdateRegistroAulaDTO extends RegistroAula {
  @IsString()
  curso: string;

  @IsString()
  materia: string;

  @IsString()
  turma: string;

  @IsString()
  dt_aula: Date;

  @IsString()
  descricao_aula: string;
}
