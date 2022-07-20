import { RegistroAula } from '../entities/registro_aula.entity';
import { IsString } from 'class-validator';

export class UpdateRegistroAulaDTO extends RegistroAula {
  @IsString()
  turma: string;

  @IsString()
  descricao_aula: string;
}
