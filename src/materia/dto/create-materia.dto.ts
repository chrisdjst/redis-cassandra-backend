import { Materia } from '../entities/materia.entity';
import { IsInt, IsString } from 'class-validator';

export class CreateMateriaDTO extends Materia {
  @IsString()
  nome: string;

  @IsInt()
  ch_materia: number;
}
