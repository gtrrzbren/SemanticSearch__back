import { Injectable } from '@nestjs/common';
import { PrismaClient, Registro, Prisma } from '@prisma/client';

@Injectable()
export class RegistroService {
  private prisma = new PrismaClient();

  async create(data: Prisma.RegistroCreateInput): Promise<Registro> {
    return this.prisma.registro.create({ data });
  }

  async findAll(): Promise<Registro[]> {
    return this.prisma.registro.findMany();
  }
}
