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

  @Get('matricula/:email')
  async getMatriculaByEmail(@Param('email') email: string) {
    return this.matriculaService.getMatriculaByEmail(email);
  }

  @Put('matricula/:email')
  async updateMatriculaByNumMatricula(
    @Param('num_matricula') email: string,
    @Body() matricula: UpdateMatriculaDTO,
  ) {
    return this.matriculaService.updateMatricula(email, matricula);
  }

  @Post('matricula')
  async createUsuario(@Body() matricula: CreateMatriculaDTO) {
    return this.matriculaService.createMatricula(matricula);
  }

  @IsPublic()
  @Get('redisMatricula/:email')
  async getMatriculaByRedis(@Param('email') email: string) {
    return this.matriculaService.getMatriculaByRedis(email);
  }
}
