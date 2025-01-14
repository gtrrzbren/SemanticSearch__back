import { IsString, IsDate, IsOptional } from 'class-validator';

export class SolicAdvancSearch {
  @IsString()
  @IsOptional()
  searchTerm: string;

  @IsString()
  @IsOptional()
  media: string;

  @IsString()
  @IsOptional()
  autor: string;

  @IsDate()
  @IsOptional()
  publicationDate: Date;

  @IsString()
  @IsOptional()
  section: string;
}