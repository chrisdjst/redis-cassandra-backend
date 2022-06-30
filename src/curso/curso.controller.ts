import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDTO } from './dto/create-curso.dto';
import { UpdateCursoDTO } from './dto/update-curso.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class CursoController {
  constructor(private cursoService: CursoService) {}
  //@IsPublic()
  @Get('curso')
  async getCurso() {
    return this.cursoService.getCurso();
  }

  @Get('curso/:cod_curso')
  async getCursoByCodCurso(@Param('cod_curso') cod_curso: string) {
    return this.cursoService.getCursoByCodCurso(cod_curso);
  }

  @Put('curso/:cod_curso')
  async updateCursoByCodCurso(
    @Param('cod_curso') cod_curso: string,
    @Body() curso: UpdateCursoDTO,
  ) {
    return this.cursoService.updateCurso(cod_curso, curso);
  }

  @Post('curso')
  async createUsuario(@Body() curso: CreateCursoDTO) {
    return this.cursoService.createCurso(curso);
  }

  @IsPublic()
  @Get('redisCurso/:cod_curso')
  async getCursoByRedis(@Param('cod_curso') cod_curso: string) {
    return this.cursoService.getCursoByRedis(cod_curso);
  }
}
