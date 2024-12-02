import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { JenaSearchResourceService } from './jena-search-resource.service';

@Controller('deprensa')
export class JenaSearchResourceController {
  constructor(private readonly jenaSearchResourceService: JenaSearchResourceService) {}

  @Get('getallsynonym')
  getAllSynonymOwl(): string {
    return this.jenaSearchResourceService.getAllSynonymOwl();
  }

  @Get('getsynonym/:word')
  getSynonymOwl(@Param('word') word: string): string {
    return this.jenaSearchResourceService.getSynonymOwl(word);
  }

  @Get('getrelated/:word')
  getRelatedOwl(@Param('word') word: string): string {
    return this.jenaSearchResourceService.getRelatedOwl(word);
  }

  @Get('getmoresearch')
  getMoreSearch(): string {
    return this.jenaSearchResourceService.getMoreSearch();
  }

  @Get('getfather/:word')
  getFatherOwl(@Param('word') word: string): string {
    return this.jenaSearchResourceService.getFatherOwl(word);
  }

  @Get('autocomplete/:word')
  getAutocompleteOwl(@Param('word') word: string): string {
    return this.jenaSearchResourceService.getAutocompleteOwl(word);
  }
}
