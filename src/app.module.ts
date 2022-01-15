import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search/search.controller';
import { InfoController } from './info/info.controller';
import { DlQueueGateway } from './gateways/dl-queue.gateway';
import { ConfigModule } from '@nestjs/config';
import { DownloadController } from './download/download.controller';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'],
  })],
  controllers: [AppController, SearchController, InfoController, DownloadController],
  providers: [AppService, DlQueueGateway],
})
export class AppModule {}
