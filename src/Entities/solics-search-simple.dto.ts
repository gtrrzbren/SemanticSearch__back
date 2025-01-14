import { IsString } from 'class-validator';

export class SolicSearchSimple {
  @IsString()
  searchTerm: string;
}