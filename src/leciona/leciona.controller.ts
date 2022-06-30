import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { LecionaService } from './leciona.service';
import { CreateLecionaDTO } from './dto/create-leciona.dto';
import { UpdateLecionaDTO } from './dto/update-leciona.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller()
export class LecionaController {
  constructor(private lecionaService: LecionaService) {}
  //@IsPublic()
  @Get('leciona')
  async getLeciona() {
    return this.lecionaService.getLeciona();
  }

  @Get('leciona/:email')
  async getLecionaByEmail(@Param('email') email: string) {
    return this.lecionaService.getLecionaByEmail(email);
  }

  @Put('leciona/:email')
  async updateLecionaByEmail(
    @Param('email') email: string,
    @Body() leciona: UpdateLecionaDTO,
  ) {
    return this.lecionaService.updateLeciona(email, leciona);
  }

  @Post('leciona')
  async createLeciona(@Body() leciona: CreateLecionaDTO) {
    return this.lecionaService.createLeciona(leciona);
  }

  @IsPublic()
  @Get('redis/:email')
  async getLecionaByRedis(@Param('email') email: string) {
    return this.lecionaService.getLecionaByRedis(email);
  }
}
