/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './registro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registro])],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
