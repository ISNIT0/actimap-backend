import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Get('/')
  getEvents(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('bbox') bbox: string,
  ) {
    const parsedBBox = bbox && bbox.split(',').map(Number);
    return this.eventsService.getEvents({
      from: new Date(from),
      to: new Date(to),
      bbox: parsedBBox,
    });
  }
}
