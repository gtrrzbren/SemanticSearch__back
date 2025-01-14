/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as $rdf from 'rdflib';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class OntologyTreatmentService {
  private store: any; // Almacén RDF para la ontología
  private fetcher: any; // Fetcher para cargar la ontología
  private owlUri: string; // URI de la ontología
  private synon: string; // Término de búsqueda actual

  constructor() {
    this.store = $rdf.graph(); // Inicializar el almacén RDF
    this.fetcher = new $rdf.Fetcher(this.store); // Inicializar el fetcher

    // Cargar la ontología al iniciar el servicio
    this.setOwlUri('http://example.org/ontology#');
  }

  // Método para establecer el término de búsqueda
  setSynonym(synon: string) {
    this.synon = synon;
  }

  // Método para cargar la ontología desde un archivo OWL
  async setOwlUri(owlUri: string) {
    this.owlUri = owlUri;

    // Cargar el archivo OWL desde la ruta local
    const filePath = path.join(__dirname, '..', 'ontology', 'deprensa.owl');
    console.log(`Cargando ontología desde: ${filePath}`);

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log('Archivo OWL cargado correctamente.');

    // Parsear el contenido del archivo OWL
    $rdf.parse(fileContent, this.store, this.owlUri, 'text/turtle');
    console.log('Ontología parseada y cargada en el almacén RDF.');
  }

  // Método para obtener todos los términos relacionados con el término de búsqueda
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

  // Método para obtener sinónimos del término de búsqueda
  async loadSynonym(): Promise<string[]> {
    let synonimList = await this.getSynonymsByName();
    if (synonimList.length === 0) {
      synonimList = await this.getSynonymsBySynonym();
    }
    return synonimList;
  }

  // Método para obtener términos relacionados con el término de búsqueda
  async loadRelated(): Promise<string[]> {
    let relatedList = await this.getRelatedByName();
    if (relatedList.length === 0) {
      relatedList = await this.getRelatedBySynonym();
    }
    return relatedList;
  }

  // Método para obtener temas superiores (padres) del término de búsqueda
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

  // Método para obtener sugerencias de términos relacionados con el término de búsqueda
  async loadSuggestions(): Promise<string[]> {
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX vin: <${this.store.namespaces.vin('')}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} SELECT ?x ?nombre WHERE {?x vin:nombre ?nombre . FILTER regex(?nombre, '${nameString}', "i")} LIMIT 5`;
    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const suggestions: string[] = [];
    this.store.query(query, (results: any) => {
      results.forEach((result: any) => {
        suggestions.push(result.nombre.value);
      });
    });

    return suggestions;
  }

  // Método para obtener un tema relacionado con el término de búsqueda
  async loadRelatedTopic(term: string): Promise<string> {
    this.setSynonym(term);
    const relatedTopics = await this.loadRelated();

    if (relatedTopics.length > 0) {
      return relatedTopics[0]; // Devolver el primer tema relacionado
    }

    return 'No se encontró un tema relacionado';
  }

  // Método privado para obtener sinónimos por nombre
  private async getSynonymsByName(): Promise<string[]> {
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

  // Método privado para obtener sinónimos por sinónimo
  private async getSynonymsBySynonym(): Promise<string[]> {
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

  // Método privado para obtener términos relacionados por sinónimo
  private async getRelatedBySynonym(): Promise<string[]> {
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

  // Método privado para obtener términos relacionados por nombre
  private async getRelatedByName(): Promise<string[]> {
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

  // Método privado para verificar si un elemento está repetido en una lista
  private isRepited(list: string[], element: string): boolean {
    return list.includes(element);
  }
}