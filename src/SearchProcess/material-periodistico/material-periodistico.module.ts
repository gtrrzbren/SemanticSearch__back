import { Module } from '@nestjs/common';
import { MaterialPeriodisticoService } from './material-periodistico.service';
import { MaterialPeriodisticoController } from './material-periodistico.controller';

@Module({
  controllers: [MaterialPeriodisticoController],
  providers: [MaterialPeriodisticoService],
})
export class MaterialPeriodisticoModule {}
