import { Controller, Get, Header, Query } from '@nestjs/common';
import { IcalService } from './ical.service';

@Controller('ical.ics')
export class IcalController {
  constructor(private icalService: IcalService) {}
  @Get('/')
  @Header('content-type', 'text/calendar')
  getEvent(@Query('bbox') bbox: string) {
    const parsedBBox = bbox && bbox.split(',').map(Number);

    return this.icalService.getIcalEntries({ bbox: parsedBBox });
  }
}
