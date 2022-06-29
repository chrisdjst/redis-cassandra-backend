import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RegistroAulaService } from './registro_aula.service';
import { CreateRegistroAulaDTO } from './dto/create-registro_aula.dto';
import { UpdateRegistroAulaDTO } from './dto/update-registro_aula.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class RegistroAulaController {
  constructor(private aulaService: RegistroAulaService) {}
  //@IsPublic()
  @Get('aulas')
  async getAulas() {
    return this.aulaService.getRegistroAula();
  }

  @Get('aulas/:email')
  async getRegistroAulaByEmail(@Param('email') email: string) {
    return this.aulaService.getRegistroAulaByEmail(email);
  }

  @Put('aulas/:email')
  async updateRegistroAulaByEmail(
    @Param('email') email: string,
    @Body() aula: UpdateRegistroAulaDTO,
  ) {
    return this.aulaService.updateRegistroAulaEmail(email, aula);
  }

  @Post('aulas')
  async createUsuario(@Body() aula: CreateRegistroAulaDTO) {
    return this.aulaService.createRegistroAula(aula);
  }

  @IsPublic()
  @Get('redis/:email')
  async getRegistroAulaByRedis(@Param('email') email: string) {
    return this.aulaService.getRegistroAulaByRedis(email);
  }
}
