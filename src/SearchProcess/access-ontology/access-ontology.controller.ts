import { Controller } from '@nestjs/common';
import { AccessOntologyService } from './access-ontology.service';

@Controller('access-ontology')
export class AccessOntologyController {
  constructor(private readonly accessOntologyService: AccessOntologyService) {}
}
