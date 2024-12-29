/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as $rdf from 'rdflib';

@Injectable()
export class OntologyTreatmentService {
  private store: any;
  private fetcher: any;
  private owlUri: string;
  private synon: string;

  constructor() {
    this.store = $rdf.graph();
    this.fetcher = new $rdf.Fetcher(this.store);
  }

  getOwlUri(): string {
    return this.owlUri;
  }

  setSynonym(synon: string) {
    this.synon = synon;
  }

  getSynonym(): string {
    return this.synon;
  }

  async setOwlUri(owlUri: string) {
    this.owlUri = owlUri;
    await this.fetcher.load(owlUri);
  }

  async loadAll(): Promise<string[]> {
    const nameString = this.synon.toLowerCase().replace('/', ' ');
    const all: string[] = [];

    const prolog = `PREFIX vin: <${this.store.namespaces.vin('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';

    const queryString = `${prolog} ${prolog2} SELECT ?x ?nombre WHERE {?x vin:nombre ?nombre . FILTER regex(?nombre, '${nameString}', "i")} LIMIT 5`;
    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    this.store.query(query, (results: any) => {
      results.forEach((result: any) => {
        all.push(result.nombre.value);
      });
    });

    return all;
  }

  async loadSynonym(): Promise<string[]> {
    let synonimList = await this.getSynonymsByName();
    if (synonimList.length === 0) {
      synonimList = await this.getSynonymsBySynonym();
    }
    return synonimList;
  }

  async loadRelated(): Promise<string[]> {
    let relatedList = await this.getRelatedByName();
    if (relatedList.length === 0) {
      relatedList = await this.getRelatedBySynonym();
    }
    return relatedList;
  }

  async getSynonymsByName(): Promise<string[]> {
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.store.namespaces.vin('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?nombre ?sinonims WHERE {?x vin:nombre ?nombre . FILTER (fn:lower-case(?nombre) = '${nameString.replace('/', ' ')}') . ?x vin:sinonimo ?sinonims}`;
    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const synonyms: string[] = [];
    this.store.query(query, (results: any) => {
      results.forEach((result: any) => {
        synonyms.push(result.sinonims.value);
      });
    });

    return synonyms;
  }

  async getSynonymsBySynonym(): Promise<string[]> {
    const synonymString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.store.namespaces.vin('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?sinonim ?sinonims WHERE {?x vin:sinonimo ?sinonim . FILTER (fn:lower-case(?sinonim) = '${synonymString.replace('/', ' ')}') . ?x vin:sinonimo ?sinonims}`;
    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const synonyms: string[] = [];
    this.store.query(query, (results: any) => {
      results.forEach((result: any) => {
        synonyms.push(result.sinonims.value);
      });
    });

    return synonyms;
  }

  async getRelatedBySynonym(): Promise<string[]> {
    const synonymString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.store.namespaces.vin('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?sinonim ?termino ?nombre WHERE {?x vin:sinonimo ?sinonim . ?x vin:termino_relacionado ?termino . ?termino vin:nombre ?nombre}`;
    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const relatedTerms: string[] = [];
    this.store.query(query, (results: any) => {
      results.forEach((result: any) => {
        relatedTerms.push(result.nombre.value);
      });
    });

    return relatedTerms;
  }

  async getRelatedByName(): Promise<string[]> {
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.store.namespaces.vin('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?termino ?nombre ?result WHERE {?x vin:termino_relacionado ?termino . ?x vin:nombre ?nombre . ?termino vin:nombre ?result}`;
    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const relatedTerms: string[] = [];
    this.store.query(query, (results: any) => {
      results.forEach((result: any) => {
        relatedTerms.push(result.result.value);
      });
    });

    return relatedTerms;
  }

  async loadFather(): Promise<string[]> {
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.store.namespaces.vin('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?termino ?nombre ?result WHERE {?x vin:termino_superior ?termino . ?x vin:nombre ?nombre . ?termino vin:nombre ?result}`;
    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const fathers: string[] = [];
    this.store.query(query, (results: any) => {
      results.forEach((result: any) => {
        fathers.push(result.result.value);
      });
    });

    return fathers;
  }

  private isRepited(list: string[], element: string): boolean {
    return list.includes(element);
  }
}
