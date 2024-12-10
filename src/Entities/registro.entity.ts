/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Registro {
  @PrimaryGeneratedColumn()
  materialPeriodisticoId: number;

  @Column()
  titulo: string;

  @Column()
  contenido: string;
}
