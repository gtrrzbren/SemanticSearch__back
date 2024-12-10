/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SearchProcessService } from './search-process.service';
import { SearchProcessController } from './search-process.controller';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [EntitiesModule],
  providers: [SearchProcessService],
  controllers: [SearchProcessController],
})
export class SearchProcessModule {}
