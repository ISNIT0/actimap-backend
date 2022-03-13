import { Controller, Get, Query } from '@nestjs/common';
import { IcalService } from './ical.service';

@Controller('ical')
export class IcalController {
    constructor(private icalService: IcalService) {}
    @Get('/')
    getEvent(
        @Query('bbox') bbox: string
    ) {
        const parsedBBox = bbox && bbox.split(',').map(Number);

        return this.icalService.getIcalEntries({bbox: parsedBBox});
    }
}
