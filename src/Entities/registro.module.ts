import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';

@Module({
  providers: [RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}
