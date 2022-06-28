import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get('usuarios')
  async getUsuarios() {
    return this.usuarioService.getUsuarios();
  }

  @Get('usuarios/:email')
  async getUsuarioByEmail(@Param('email') email: string) {
    return this.usuarioService.getUsuarioByEmail(email);
  }

  @Put('usuarios/:email')
  async updateUsuarioByEmail(
    @Param('email') email: string,
    @Body() usuario: UpdateUsuarioDTO,
  ) {
    return this.usuarioService.updateUsuarioName(email, usuario);
  }

  @IsPublic()
  @Post('usuarios')
  async createUsuario(@Body() usuario: CreateUsuarioDTO) {
    return this.usuarioService.createUsuario(usuario);
  }
}
