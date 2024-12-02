/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { OwlUriStorageService } from '../owl-uri-storage/owl-uri-storage.service';
import { JenaSearchService } from './jena-search.service';

@Injectable()
export class JenaSearchResourceService {
  constructor(
    private readonly owlUriStorageService: OwlUriStorageService,
    private readonly jenaSearchService: JenaSearchService
  ) {}

  getAllSynonymOwl(): string {
    const synlist = this.jenaSearchService.getAllSynonym(this.owlUriStorageService.getOwlUri());
    return this.formatJsonResponse(synlist);
  }

  getSynonymOwl(word: string): string {
    const synlist = this.jenaSearchService.getSynonym(this.owlUriStorageService.getOwlUri(), word);
    return this.formatJsonResponse(synlist);
  }

  getRelatedOwl(word: string): string {
    const relaclist = this.jenaSearchService.getRelac(this.owlUriStorageService.getOwlUri(), word);
    return this.formatJsonResponse(relaclist);
  }

  async getMoreSearch(): Promise<string> {
    return this.jenaSearchService.getAllWords(this.owlUriStorageService.getWordsUri());
  }

  getFatherOwl(word: string): string {
    const fatherlist = this.jenaSearchService.getFather(this.owlUriStorageService.getOwlUri(), word);
    return this.formatJsonResponse(fatherlist);
  }

  getAutocompleteOwl(word: string): string {
    const resultlist = this.jenaSearchService.getAutocomplete(this.owlUriStorageService.getOwlUri(), word);
    return this.formatJsonResponse(resultlist, '|');
  }

  private formatJsonResponse(list: string[], delimiter: string = ','): string {
    return list.map(item => `"${item}"`).join(delimiter);
  }
}
