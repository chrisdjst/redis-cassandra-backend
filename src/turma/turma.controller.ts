import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { CreateTurmaDTO } from './dto/create-turma.dto';
import { UpdateTurmaDTO } from './dto/update-turma.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class TurmaController {
  constructor(private turmaService: TurmaService) {}
  //@IsPublic()
  @Get('turmas')
  async getTurmas() {
    return this.turmaService.getTurmas();
  }

  @Get('turmas/:cod_turma')
  async getTurmaByEmail(@Param('cod_turma') cod_turma: string) {
    return this.turmaService.getTurmaByCodTurma(cod_turma);
  }

  @Put('turmas/:cod_turma')
  async updateTurmaByCodTurma(
    @Param('cod_turma') cod_turma: string,
    @Body() turma: UpdateTurmaDTO,
  ) {
    return this.turmaService.updateTurmaCodTurma(cod_turma, turma);
  }

  @IsPublic()
  @Post('turma')
  async createTurma(@Body() turma: CreateTurmaDTO) {
    return this.turmaService.createTurma(turma);
  }

  @IsPublic()
  @Get('redis/:cod_turma')
  async getTurmaByRedis(@Param('cod_turma') cod_turma: string) {
    return this.turmaService.getTurmaByRedis(cod_turma);
  }
}
