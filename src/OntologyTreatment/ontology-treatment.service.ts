/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class OntologyTreatmentService {
  private model: any;
  private owlUri: string;
  private synon: string;

  constructor() {
    this.model = null;
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

  setOwlUri(owlUri: string) {
    this.owlUri = owlUri;
    this.model = {}; // Aquí deberías inicializar tu modelo de ontología (equivalente en JavaScript)
  }

  loadAll(): string[] {
    const nameString = this.synon.toLowerCase().replace('/', ' ');
    const all: string[] = [];
    const prolog = `PREFIX vin: <${this.model.getNsPrefixURI('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';

    const queryString = `${prolog} ${prolog2} SELECT ?x ?nombre WHERE {?x vin:nombre ?nombre . FILTER regex(?nombre, '${nameString}', "i")} LIMIT 5`;
    const queryString1 = `${prolog} ${prolog2} SELECT ?x ?sinonimo WHERE {?x vin:sinonimo ?sinonimo . FILTER regex(?sinonimo, '${nameString}', "i")} LIMIT 5`;
    const queryString2 = `${prolog} ${prolog2} SELECT ?x ?sinonimo ?nombre WHERE {?x vin:sinonimo ?sinonimo . FILTER regex(?sinonimo, '${nameString}', "i") . ?x vin:nombre ?nombre} LIMIT 5`;

    // Aquí deberías implementar la lógica para ejecutar las consultas sobre tu modelo

    return all;
  }

  loadSynonym(): string[] {
    let synonimList = this.getSynonymsByName();
    if (synonimList.length === 0) {
      synonimList = this.getSynonymsBySynonym();
    }
    return synonimList;
  }

  loadRelated(): string[] {
    let relatedList = this.getRelatedByName();
    if (relatedList.length === 0) {
      relatedList = this.getRelatedBySynonym();
    }
    return relatedList;
  }

  getSynonymsByName(): string[] {
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.model.getNsPrefixURI('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?nombre ?sinonims WHERE {?x vin:nombre ?nombre . FILTER (fn:lower-case(?nombre) = '${nameString.replace('/', ' ')}') . ?x vin:sinonimo ?sinonims}`;

    // Aquí deberías implementar la lógica para ejecutar la consulta sobre tu modelo

    return [];
  }

  getSynonymsBySynonym(): string[] {
    const synonymString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.model.getNsPrefixURI('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?sinonim ?sinonims WHERE {?x vin:sinonimo ?sinonim . FILTER (fn:lower-case(?sinonim) = '${synonymString.replace('/', ' ')}') . ?x vin:sinonimo ?sinonims}`;

    // Aquí deberías implementar la lógica para ejecutar la consulta sobre tu modelo

    return [];
  }

  getRelatedBySynonym(): string[] {
    const synonymString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.model.getNsPrefixURI('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?sinonim ?termino ?nombre WHERE {?x vin:sinonimo ?sinonim . ?x vin:termino_relacionado ?termino . ?termino vin:nombre ?nombre}`;

    // Aquí deberías implementar la lógica para ejecutar la consulta sobre tu modelo

    return [];
  }

  getRelatedByName(): string[] {
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.model.getNsPrefixURI('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?termino ?nombre ?result WHERE {?x vin:termino_relacionado ?termino . ?x vin:nombre ?nombre . ?termino vin:nombre ?result}`;

    // Aquí deberías implementar la lógica para ejecutar la consulta sobre tu modelo

    return [];
  }

  loadFather(): string[] {
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.model.getNsPrefixURI('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?termino ?nombre ?result WHERE {?x vin:termino_superior ?termino . ?x vin:nombre ?nombre . ?termino vin:nombre ?result}`;

    // Aquí deberías implementar la lógica para ejecutar la consulta sobre tu modelo

    return [];
  }

  private isRepited(list: string[], element: string): boolean {
    return list.includes(element);
  }
}

