/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './registro.entity';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { RegistroModule } from './registro.module';

@Module({
  imports: [TypeOrmModule.forFeature([Registro]), RegistroModule],
  providers: [RegistroService],
  controllers: [RegistroController],
  exports: [TypeOrmModule, RegistroModule],
})
export class EntitiesModule {}

