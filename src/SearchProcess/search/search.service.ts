/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { FunctionsService } from '../functions/functions.service';
import { MaterialPeriodisticoService } from '../material-periodistico/material-periodistico.service';
import { OwlUriStorageService } from '../owl-uri-storage/owl-uri-storage.service';
import { JenaSearchService } from '../jena-search/jena-search.service';
import { JenaSearchResourceService } from '../jena-search-resource/jena-search-resource.service';

@Injectable()
export class SearchService {
  constructor(
    private functionsService: FunctionsService,
    private materialPeriodisticoService: MaterialPeriodisticoService,
    private owlUriStorageService: OwlUriStorageService,
    private jenaSearchService: JenaSearchService,
    private jenaSearchResourceService: JenaSearchResourceService,
  ) {}

  async basicSearch(query: string): Promise<any> {
    const processedQuery = await this.functionsService.processText(query);
    return await this.jenaSearchService.search(processedQuery);
  }

  async advancedSearch(body: any): Promise<any> {
    const processedQuery = await this.functionsService.processText(body.query);
    const filteredResults = await this.materialPeriodisticoService.filterResults(body.filters);
    const expandedResults = await this.owlUriStorageService.expandResults(filteredResults);
    const relatedTerms = await this.jenaSearchResourceService.getRelatedTerms(expandedResults);
    return await this.jenaSearchService.search(processedQuery, relatedTerms);
  }

  async autocomplete(query: string): Promise<string[]> {
    return await this.jenaSearchResourceService.getAutocompleteSuggestions(query);
  }
}

