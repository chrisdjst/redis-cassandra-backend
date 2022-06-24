import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @IsPublic()
  @Get('usuarios')
  async getUsuarios() {
    return this.usuarioService.getUsuarios();
  }

  @Get('usuarios/:id')
  async getUsuarioById(@Param('id') id: number) {
    return this.usuarioService.getUsuarioById(id);
  }

  @Put('usuarios/:id')
  async updateUsuarioById(
    @Param('id') id: number,
    @Body() usuario: UpdateUsuarioDTO,
  ) {
    return this.usuarioService.updateUsuarioName(id, usuario.Nome);
  }

  @IsPublic()
  @Post('usuarios')
  async createUsuario(@Body() usuario: CreateUsuarioDTO) {
    return this.usuarioService.createUsuario(usuario);
  }
}
