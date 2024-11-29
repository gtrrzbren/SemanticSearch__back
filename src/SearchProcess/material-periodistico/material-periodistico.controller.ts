import { Controller } from '@nestjs/common';
import { MaterialPeriodisticoService } from './material-periodistico.service';

@Controller('material-periodistico')
export class MaterialPeriodisticoController {
  constructor(private readonly materialPeriodisticoService: MaterialPeriodisticoService) {}
}
