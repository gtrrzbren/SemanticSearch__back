import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './registro.entity';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Registro])],
  providers: [RegistroService],
  controllers: [RegistroController],
  exports: [RegistroService],
})
export class RegistroModule {}
