import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { Registro } from './registro.entity';

@Controller('registros')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  async create(@Body() data: Partial<Registro>): Promise<Registro> {
    return this.registroService.create(data);
  }

  @Get()
  async findAll(): Promise<Registro[]> {
    return this.registroService.findAll();
  }
}
