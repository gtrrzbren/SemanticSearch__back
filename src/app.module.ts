/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from './entities/entities.module';
import { SearchProcessModule } from './SearchProcess/search-process.module';
import { OntologyTreatmentModule } from './OntologyTreatment/ontology-treatment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EntitiesModule,
    SearchProcessModule,
    OntologyTreatmentModule,
  ],
})
export class AppModule {}




