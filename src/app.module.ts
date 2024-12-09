/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './SearchProcess/search.service';
import { SearchModule } from './SearchProcess/search.module';

@Module({
  imports: [
    ElasticsearchModule.register({ node: 'http://localhost:9200', 
      auth: { username: 'elastic', 
              password: 'changeme' },} ), 
    SearchModule, ],
  controllers: [AppController],
  providers: [SearchService],
})
export class AppModule {}


