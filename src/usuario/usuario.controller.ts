import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';

@Controller()
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

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

  @Post('usuarios')
  async createUsuario(@Body() usuario: CreateUsuarioDTO) {
    return this.usuarioService.createUsuario(usuario);
  }
}
