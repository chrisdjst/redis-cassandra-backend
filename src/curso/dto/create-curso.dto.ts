import { Curso } from '../entities/curso.entity';
import { IsInt, IsString } from 'class-validator';

export class CreateCursoDTO extends Curso {
  @IsString()
  nome: string;

  @IsInt()
  ch_curso: number;

  @IsString()
  descricao_curso: string;

  @IsString()
  cod_curso: string;
}
