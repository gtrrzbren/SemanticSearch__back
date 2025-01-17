import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { Registro, Prisma } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Media, Section } from '@prisma/client'; // Importar los enums directamente

@ApiTags('Registro') // Etiqueta para agrupar los endpoints en Swagger
@Controller('registros')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        searchTerm: { type: 'string', nullable: true },
        media: { type: 'string', enum: Object.values(Media), nullable: true }, // Usar el enum Media
        autor: { type: 'string', nullable: true },
        publicationDate: { type: 'string', format: 'date-time', nullable: true },
        section: { type: 'string', enum: Object.values(Section), nullable: true }, // Usar el enum Section
        contenido: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Registro creado exitosamente' })
  async create(@Body() data: Prisma.RegistroCreateInput): Promise<Registro> {
    return this.registroService.create(data);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de registros obtenida exitosamente' })
  async findAll(): Promise<Registro[]> {
    return this.registroService.findAll();
  }
}