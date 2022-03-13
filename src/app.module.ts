import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Event } from './database/entity/Event.entity';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { RemoteEventsService } from './remote-events/remote-events.service';
import { RemoteEventsController } from './remote-events/remote-events.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Event])],
  controllers: [AppController, EventsController, RemoteEventsController],
  providers: [AppService, EventsService, RemoteEventsService],
})
export class AppModule {}
