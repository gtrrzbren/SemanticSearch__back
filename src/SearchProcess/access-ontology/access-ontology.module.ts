import { Module } from '@nestjs/common';
import { AccessOntologyService } from './access-ontology.service';
import { AccessOntologyController } from './access-ontology.controller';

@Module({
  controllers: [AccessOntologyController],
  providers: [AccessOntologyService],
})
export class AccessOntologyModule {}
