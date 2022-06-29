import { Curso } from '../entities/curso.entity';
import { IsInt, IsString } from 'class-validator';

export class UpdateCursoDTO extends Curso {
  @IsString()
  nome: string;

  @IsInt()
  carga_horaria: number;

  @IsString()
  descricao: string;
}
