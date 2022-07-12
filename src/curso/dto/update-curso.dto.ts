import { Curso } from '../entities/curso.entity';
import { IsInt, IsString } from 'class-validator';

export class UpdateCursoDTO extends Curso {
  @IsString()
  nome: string;

  @IsInt()
  ch_curso: number;

  @IsString()
  descricao_curso: string;
}
