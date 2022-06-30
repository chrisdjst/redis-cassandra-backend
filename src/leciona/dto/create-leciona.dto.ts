import { Leciona } from '../entities/leciona.entity';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateLecionaDTO extends Leciona {

  @IsEmail()
  email: string;

  @IsString()
  tipo_usuario: string;

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
