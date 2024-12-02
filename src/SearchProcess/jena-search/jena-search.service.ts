/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { readFile, writeFile, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class JenaSearchService {
  getAllSynonym(owlUri: string): string[] {
    // Simulación del método `loadAllsynonym` de AccessOntology
    return ['sinonimo1', 'sinonimo2', 'sinonimo3'];
  }

  getSynonym(owlUri: string, word: string): string[] {
    // Simulación del método `loadSynonym` de AccessOntology
    return ['sinonimo1', 'sinonimo2', 'sinonimo3'].filter(syn => syn.includes(word));
  }

  getRelac(owlUri: string, word: string): string[] {
    // Simulación del método `loadRelated` de AccessOntology
    return ['relacion1', 'relacion2', 'relacion3'].filter(rel => rel.includes(word));
  }

  getFather(owlUri: string, word: string): string[] {
    // Simulación del método `loadFather` de AccessOntology
    return ['padre1', 'padre2', 'padre3'].filter(father => father.includes(word));
  }

  getAutocomplete(owlUri: string, word: string): string[] {
    // Simulación del método `loadAll` de AccessOntology
    return ['autocompletar1', 'autocompletar2', 'autocompletar3'].filter(auto => auto.includes(word));
  }

  async addWord(wordsUri: string, word: string): Promise<void> {
    const filePath = join(process.cwd(), wordsUri);
    const exists = existsSync(filePath);
    
    if (exists && await this.existWord(filePath, word)) {
      return;
    }

    await writeFile(filePath, `${word}\n`, { flag: 'a' });
  }

  async getAllWords(wordsUri: string): Promise<string> {
    const filePath = join(process.cwd(), wordsUri);
    return new Promise((resolve, reject) => {
      readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.split('\n').filter(Boolean).join(','));
      });
    });
  }

  async existWord(filePath: string, word: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.split('\n').some(line => line.trim().toLowerCase() === word.trim().toLowerCase()));
      });
    });
  }
}

