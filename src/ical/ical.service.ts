import { Injectable } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';

import * as ics from 'ics';

@Injectable()
export class IcalService {
  constructor(private eventsService: EventsService) {}

  async getIcalEntries({ bbox }: { bbox: number[] }) {
    const from = new Date(0);
    const to = new Date();
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
        start: [
          event.startAt.getFullYear(),
          event.startAt.getMonth(),
          event.startAt.getDate(),
        ],
        duration: { hours: 2 },
        geo: { lat: event.latitude, lon: event.longitude },
        url: event.whatsAppUrl,
        // organizer: { email: event.contact },
        uid: event.id,
      });
    });

    return icalEvents.map((ev) => ev.value).join('\n');
  }
}
