import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDTO } from './dto/create-curso.dto';
import { UpdateCursoDTO } from './dto/update-curso.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class CursoController {
  constructor(private aulaService: CursoService) {}
  //@IsPublic()
  @Get('curso')
  async getAulas() {
    return this.aulaService.getCurso();
  }

  @Get('curso/:cod_curso')
  async getCursoByCodCurso(@Param('cod_curso') cod_curso: string) {
    return this.aulaService.getCursoByCodCurso(cod_curso);
  }

  @Put('curso/:cod_curso')
  async updateCursoByCodCurso(
    @Param('cod_curso') cod_curso: string,
    @Body() aula: UpdateCursoDTO,
  ) {
    return this.aulaService.updateCurso(cod_curso, aula);
  }

  @Post('curso')
  async createUsuario(@Body() aula: CreateCursoDTO) {
    return this.aulaService.createCurso(aula);
  }

  @IsPublic()
  @Get('redis/:cod_curso')
  async getCursoByRedis(@Param('cod_curso') cod_curso: string) {
    return this.aulaService.getCursoByRedis(cod_curso);
  }
}
