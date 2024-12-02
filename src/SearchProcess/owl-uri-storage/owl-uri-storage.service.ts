/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class OwlUriStorageService {
  private owlUri: string = '/root/deprensa.owl';
  private wordsUri: string = '/root/words.txt';

  getOwlUri(): string {
    return this.owlUri;
  }

  setOwlUri(owlUri: string): void {
    this.owlUri = owlUri;
  }

  getWordsUri(): string {
    return this.wordsUri;
  }

  setWordsUri(wordsUri: string): void {
    this.wordsUri = wordsUri;
  }
}

