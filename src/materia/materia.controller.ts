import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDTO } from './dto/create-materia.dto';
import { UpdateMateriaDTO } from './dto/update-materia.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class MateriaController {
  constructor(private materiaService: MateriaService) {}
  //@IsPublic()
  @Get('materias')
  async getMaterias() {
    return this.materiaService.getMaterias();
  }

  @Get('materias/:nome')
  async getMateriaByNome(@Param('nome') nome: string) {
    return this.materiaService.getMateriaByNome(nome);
  }

  @Put('materias/:nome')
  async updateMateriaByNome(
    @Param('nome') nome: string,
    @Body() materia: UpdateMateriaDTO,
  ) {
    return this.materiaService.updateMateriaName(nome, materia);
  }

  @IsPublic()
  @Post('registro')
  async createMateria(@Body() materia: CreateMateriaDTO) {
    return this.materiaService.createMateria(materia);
  }

  @IsPublic()
  @Get('redis/:materia')
  async getMateriaByRedis(@Param('nome') nome: string) {
    return this.materiaService.getMateriaByRedis(nome);
  }
}
