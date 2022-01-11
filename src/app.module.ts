import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search/search.controller';
import { InfoController } from './info/info.controller';
import { DlQueueGateway } from './gateways/dl-queue.gateway';

@Module({
  imports: [],
  controllers: [AppController, SearchController, InfoController],
  providers: [AppService, DlQueueGateway],
})
export class AppModule {}
