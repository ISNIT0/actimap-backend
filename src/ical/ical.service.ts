import { Injectable } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';

import { ics } from ics

@Injectable()
export class IcalService {
    constructor(private eventsService: EventsService) {}

    async getIcalEntries({
        bbox
    }: {
        bbox: number[];
    }) {
        let from = new Date(0);
        let to = new Date();
        to.setFullYear(3000);

        const events = await this.eventsService.getEvents({
            from: new Date(from),
            to: new Date(to),
            bbox: bbox,
        });

        const icalEvents = events.map((event) => {
            return ics.createEvent({
                title: event.summary,
                description: event.description,
                start: event.startAt,
                geo: { lat: event.latitude, lon: event.longitude },
                url: event.whatsAppUrl,
                organizer: { email: event.contact },
                uid: event.id
            });
        });

        return icalEvents;
    }
}