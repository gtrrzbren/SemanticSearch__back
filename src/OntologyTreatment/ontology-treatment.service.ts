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

    // Registrar el prefijo manualmente
    this.store.namespaces['untitled-ontology-4'] = 'http://www.semanticweb.org/etom/ontologies/2018/3/untitled-ontology-4#';

    // Cargar la ontología al iniciar el servicio
    this.setOwlUri('http://www.semanticweb.org/etom/ontologies/2018/3/untitled-ontology-4');
  }

  // Método para establecer el término de búsqueda
  setSynonym(synon: string) {
    this.synon = synon;
    console.log(`Término de búsqueda establecido: ${this.synon}`);
  }

  // Método para cargar la ontología desde un archivo OWL
  async setOwlUri(owlUri: string) {
    this.owlUri = owlUri;
  
    const filePath = path.join(process.cwd(), 'ontology', 'deprensa.owl');
    console.log(`Cargando ontología desde: ${filePath}`);
  
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      console.log('Archivo OWL cargado correctamente.');
  
      $rdf.parse(fileContent, this.store, this.owlUri, 'application/rdf+xml');
      console.log('Ontología parseada y cargada en el almacén RDF.');
  
      // Verifica los namespaces cargados
      console.log('Namespaces cargados:', this.store.namespaces);
  
      // Verifica algunos términos de la ontología
      const terms = this.store.statementsMatching(undefined, undefined, undefined);
      console.log('Número de términos cargados:', terms.length);
      if (terms.length > 0) {
        console.log('Ejemplo de término cargado:', terms[0]);
      }
    } catch (error) {
      console.error('Error al cargar la ontología:', error);
    }
  }

  // Método para obtener todos los términos relacionados con el término de búsqueda
  async loadAll(): Promise<string[]> {
    console.log('Ejecutando loadAll para el término:', this.synon);
    const nameString = this.synon.toLowerCase().replace('/', ' ');
    const all: string[] = [];

    const prolog = `PREFIX untitled-ontology-4: <${this.store.namespaces['untitled-ontology-4']}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} 
      SELECT ?x ?nombre 
      WHERE {
        ?x untitled-ontology-4:nombre ?nombre .
        FILTER regex(?nombre, '${nameString}', "i")
      } LIMIT 5`;
    console.log('Consulta SPARQL (loadAll):', queryString);

    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    this.store.query(query, (results: any) => {
      console.log('Resultados de loadAll:', results);
      results.forEach((result: any) => {
        all.push(result.nombre.value);
      });
    });

    console.log('Resultados de loadAll:', all);
    return all;
  }

  // Método para obtener sinónimos del término de búsqueda
  async loadSynonym(): Promise<string[]> {
    console.log('Ejecutando loadSynonym para el término:', this.synon);
    let synonimList = await this.getSynonymsByName();
    if (synonimList.length === 0) {
      synonimList = await this.getSynonymsBySynonym();
    }
    console.log('Sinónimos encontrados:', synonimList);
    return synonimList;
  }

  // Método para obtener términos relacionados con el término de búsqueda
  async loadRelated(): Promise<string[]> {
    console.log('Ejecutando loadRelated para el término:', this.synon);
    let relatedList = await this.getRelatedByName();
    if (relatedList.length === 0) {
      relatedList = await this.getRelatedBySynonym();
    }
    console.log('Términos relacionados encontrados:', relatedList);
    return relatedList;
  }

  // Método para obtener temas superiores (padres) del término de búsqueda
  async loadFather(): Promise<string[]> {
    console.log('Ejecutando loadFather para el término:', this.synon);
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX untitled-ontology-4: <${this.store.namespaces['untitled-ontology-4']}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} 
      SELECT ?x ?termino ?nombre ?result 
      WHERE {
        ?x untitled-ontology-4:termino_superior ?termino .
        ?x untitled-ontology-4:nombre ?nombre .
        ?termino untitled-ontology-4:nombre ?result
      }`;
    console.log('Consulta SPARQL (loadFather):', queryString);

    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const fathers: string[] = [];
    this.store.query(query, (results: any) => {
      console.log('Resultados de loadFather:', results);
      results.forEach((result: any) => {
        fathers.push(result.result.value);
      });
    });

    console.log('Términos superiores encontrados:', fathers);
    return fathers;
  }

  // Método para obtener sugerencias de términos relacionados con el término de búsqueda
  async loadSuggestions(): Promise<string[]> {
    console.log('Ejecutando loadSuggestions para el término:', this.synon);
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX untitled-ontology-4: <${this.store.namespaces['untitled-ontology-4']}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} 
      SELECT ?x ?nombre 
      WHERE {
        ?x untitled-ontology-4:nombre ?nombre .
        FILTER regex(?nombre, '${nameString}', "i")
      } LIMIT 5`;
    console.log('Consulta SPARQL (loadSuggestions):', queryString);

    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const suggestions: string[] = [];
    this.store.query(query, (results: any) => {
      console.log('Resultados de loadSuggestions:', results);
      results.forEach((result: any) => {
        suggestions.push(result.nombre.value);
      });
    });

    console.log('Sugerencias encontradas:', suggestions);
    return suggestions;
  }

  // Método para obtener un tema relacionado con el término de búsqueda
  async loadRelatedTopic(term: string): Promise<string> {
    console.log('Ejecutando loadRelatedTopic para el término:', term);
    this.setSynonym(term);
    const relatedTopics = await this.loadRelated();

    if (relatedTopics.length > 0) {
      return relatedTopics[0]; // Devolver el primer tema relacionado
    }

    return 'No se encontró un tema relacionado';
  }

  // Método privado para obtener sinónimos por nombre
  private async getSynonymsByName(): Promise<string[]> {
  console.log('Ejecutando getSynonymsByName para el término:', this.synon);
  const nameString = this.synon.toLowerCase();
  const prolog = `PREFIX untitled-ontology-4: <${this.store.namespaces['untitled-ontology-4']}>`;
  const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
  const queryString = `${prolog} ${prolog2} 
    SELECT ?x ?nombre ?sinonims 
    WHERE {
      ?x untitled-ontology-4:nombre ?nombre .
      FILTER (fn:lower-case(?nombre) = '${nameString.replace('/', ' ')}') .
      ?x untitled-ontology-4:sinonimo ?sinonims .
    }`;
  console.log('Consulta SPARQL (getSynonymsByName):', queryString);

  try {
    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const synonyms: string[] = [];
    this.store.query(query, (results: any) => {
      console.log('Resultados de getSynonymsByName:', results);
      if (results && results.length > 0) {
        results.forEach((result: any) => {
          if (result.sinonims && result.sinonims.value) {
            console.log('Resultado encontrado:', result);
            synonyms.push(result.sinonims.value);
          }
        });
      } else {
        console.log('No se encontraron resultados para la consulta.');
      }
    });

    console.log('Sinónimos encontrados por nombre:', synonyms);
    return synonyms;
  } catch (error) {
    console.error('Error al ejecutar la consulta SPARQL:', error);
    return [];
  }
}

  // Método privado para obtener sinónimos por sinónimo
  private async getSynonymsBySynonym(): Promise<string[]> {
    console.log('Ejecutando getSynonymsBySynonym para el término:', this.synon);
    const synonymString = this.synon.toLowerCase();
    const prolog = `PREFIX untitled-ontology-4: <${this.store.namespaces['untitled-ontology-4']}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} 
      SELECT ?x ?sinonim ?sinonims 
      WHERE {
        ?x untitled-ontology-4:sinonimo ?sinonim .
        FILTER (fn:lower-case(?sinonim) = '${synonymString.replace('/', ' ')}') .
        ?x untitled-ontology-4:sinonimo ?sinonims
      }`;
    console.log('Consulta SPARQL (getSynonymsBySynonym):', queryString);

    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const synonyms: string[] = [];
    this.store.query(query, (results: any) => {
      console.log('Resultados de getSynonymsBySynonym:', results);
      results.forEach((result: any) => {
        synonyms.push(result.sinonims.value);
      });
    });

    console.log('Sinónimos encontrados por sinónimo:', synonyms);
    return synonyms;
  }

  // Método privado para obtener términos relacionados por sinónimo
  private async getRelatedBySynonym(): Promise<string[]> {
    console.log('Ejecutando getRelatedBySynonym para el término:', this.synon);
    const synonymString = this.synon.toLowerCase();
    const prolog = `PREFIX untitled-ontology-4: <${this.store.namespaces['untitled-ontology-4']}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} 
      SELECT ?x ?sinonim ?termino ?nombre 
      WHERE {
        ?x untitled-ontology-4:sinonimo ?sinonim .
        ?x untitled-ontology-4:termino_relacionado ?termino .
        ?termino untitled-ontology-4:nombre ?nombre
      }`;
    console.log('Consulta SPARQL (getRelatedBySynonym):', queryString);

    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const relatedTerms: string[] = [];
    this.store.query(query, (results: any) => {
      console.log('Resultados de getRelatedBySynonym:', results);
      results.forEach((result: any) => {
        relatedTerms.push(result.nombre.value);
      });
    });

    console.log('Términos relacionados encontrados por sinónimo:', relatedTerms);
    return relatedTerms;
  }

  // Método privado para obtener términos relacionados por nombre
  private async getRelatedByName(): Promise<string[]> {
    console.log('Ejecutando getRelatedByName para el término:', this.synon);
    const nameString = this.synon.toLowerCase();
    const prolog = `PREFIX untitled-ontology-4: <${this.store.namespaces['untitled-ontology-4']}>`;
    const prolog2 = 'PREFIX fn: <http://www.w3.org/2005/xpath-functions#>';
    const queryString = `${prolog} ${prolog2} 
      SELECT ?x ?termino ?nombre ?result 
      WHERE {
        ?x untitled-ontology-4:termino_relacionado ?termino .
        ?x untitled-ontology-4:nombre ?nombre .
        ?termino untitled-ontology-4:nombre ?result
      }`;
    console.log('Consulta SPARQL (getRelatedByName):', queryString);

    const query = $rdf.SPARQLToQuery(queryString, false, this.store);

    const relatedTerms: string[] = [];
    this.store.query(query, (results: any) => {
      console.log('Resultados de getRelatedByName:', results);
      results.forEach((result: any) => {
        relatedTerms.push(result.result.value);
      });
    });

    console.log('Términos relacionados encontrados por nombre:', relatedTerms);
    return relatedTerms;
  }

  // Método privado para verificar si un elemento está repetido en una lista
  private isRepited(list: string[], element: string): boolean {
    return list.includes(element);
  }
}