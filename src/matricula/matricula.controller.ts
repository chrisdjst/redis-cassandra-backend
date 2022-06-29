import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { CreateMatriculaDTO } from './dto/create-matricula.dto';
import { UpdateMatriculaDTO } from './dto/update-matricula.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class MatriculaController {
  constructor(private matriculaService: MatriculaService) {}
  //@IsPublic()
  @Get('matricula')
  async getAulas() {
    return this.matriculaService.getMatricula();
  }

  @Get('matricula/:num_matricula')
  async getMatriculaByNumMatricula(@Param('num_matricula') num_matricula: number) {
    return this.matriculaService.getMatriculaByNumMatricula(num_matricula);
  }

  @Put('matricula/:num_matricula')
  async updateMatriculaByNumMatricula(
    @Param('num_matricula') num_matricula: number,
    @Body() matricula: UpdateMatriculaDTO,
  ) {
    return this.matriculaService.updateMatricula(num_matricula, matricula);
  }

  @Post('matricula')
  async createUsuario(@Body() matricula: CreateMatriculaDTO) {
    return this.matriculaService.createMatricula(matricula);
  }

  @IsPublic()
  @Get('redis/:num_matricula')
  async getMatriculaByRedis(@Param('num_matricula') num_matricula: number) {
    return this.matriculaService.getMatriculaByRedis(num_matricula);
  }
}
