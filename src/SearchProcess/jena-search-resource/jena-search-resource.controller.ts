import { Controller } from '@nestjs/common';
import { JenaSearchResourceService } from './jena-search-resource.service';

@Controller('jena-search-resource')
export class JenaSearchResourceController {
  constructor(private readonly jenaSearchResourceService: JenaSearchResourceService) {}
}
