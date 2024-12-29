import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registro } from './registro.entity';

@Injectable()
export class RegistroService {
  constructor(
    @InjectRepository(Registro)
    private readonly registroRepository: Repository<Registro>,
  ) {}

  async create(data: Partial<Registro>): Promise<Registro> {
    const registro = this.registroRepository.create(data);
    return this.registroRepository.save(registro);
  }

  async findAll(): Promise<Registro[]> {
    return this.registroRepository.find();
  }
}
