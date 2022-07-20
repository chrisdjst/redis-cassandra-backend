import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RegistroAulaService } from './registro_aula.service';
import { CreateRegistroAulaDTO } from './dto/create-registro_aula.dto';
import { UpdateRegistroAulaDTO } from './dto/update-registro_aula.dto';

@Controller()
export class RegistroAulaController {
  constructor(private aulaService: RegistroAulaService) {}
  //@IsPublic()
  @Get('aulas')
  async getAulas() {
    return this.aulaService.getRegistroAula();
  }

  @Get('aulas/:materia')
  async getRegistroAulaByMateria(@Param('materia') materia: string) {
    return this.aulaService.getRegistroAulaByMateria(materia);
  }

  @Put('aulas/:materia/:curso/:dt_aula')
  async updateRegistroAulaByMateria(
    @Param('materia') materia: string,
    @Param('curso') curso: string,
    @Param('dt_aula') dt_aula: string,
    @Body() aula: UpdateRegistroAulaDTO,
  ) {
    return this.aulaService.updateRegistroAulaMateria(
      materia,
      curso,
      dt_aula,
      aula,
    );
  }

  @Post('aulas')
  async createUsuario(@Body() aula: CreateRegistroAulaDTO) {
    return this.aulaService.createRegistroAula(aula);
  }
}
