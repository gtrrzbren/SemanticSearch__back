import { Controller } from '@nestjs/common';
import { JenaSearchService } from './jena-search.service';

@Controller('jena-search')
export class JenaSearchController {
  constructor(private readonly jenaSearchService: JenaSearchService) {}
}
