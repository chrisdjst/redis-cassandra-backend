import { Curso } from '../entities/curso.entity';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateCursoDTO extends Curso {
  @IsString()
  nome: string;

  @IsInt()
  carga_horaria: number;

  @IsString()
  descricao: string;

  @IsString()
  cod_curso: string;
}
