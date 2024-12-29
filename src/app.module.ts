/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RegistroModule } from './entities/registro.module';
import { SearchProcessModule } from './SearchProcess/search-process.module';
import { ElasticsearchModule } from './SearchProcess/elasticsearch.module';
import { OntologyTreatmentModule } from './OntologyTreatment/ontology-treatment.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga variables de entorno
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres' | 'mysql' | 'sqlite', // Tipo de base de datos
      host: process.env.DB_HOST, // Dirección del servidor
      port: parseInt(process.env.DB_PORT, 10), // Puerto de la base de datos
      username: process.env.DB_USERNAME, // Usuario de la base de datos
      password: process.env.DB_PASSWORD, // Contraseña de la base de datos
      database: process.env.DB_DATABASE, // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RegistroModule,
    SearchProcessModule,
    ElasticsearchModule,
    OntologyTreatmentModule,
  ],
})
export class AppModule {}
