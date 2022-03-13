import { Injectable } from '@nestjs/common';
import axios from 'axios';
import ical from 'node-ical';
import request from 'request-promise';
import { Event } from 'src/database/entity/Event.entity';


const eventICSUrls = [
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706798.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/8635344.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/8635345.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706798.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706738.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706740.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706747.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706750.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706757.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706760.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/8636713.ics',
  //   'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/8636709.ics',
];

@Injectable()
export class RemoteEventsService {
  cache: { [key: string]: Event[] } = {};
  constructor() {
    // this.populateCache();
  }

  async populateCache() {
    eventICSUrls.forEach((icsUrl) => {
      this.getByUrl(icsUrl, true);
    });
  }

  async getByUrl(url: string, ignoreCache = false): Promise<Event[]> {
    if (ignoreCache || !this.cache[url]) {
    //   const { data: icsContent } = await axios.get(url);
    //   const events = ical.sync.parseICS(icsContent);
    //   const eventsWithLatLng = await Promise.all(
    //     Object.values(events).map(async (event) => {
    //       const { data: ret } = await axios.get(
    //         `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_API_KEY}&query=${event.location}`,
    //       );
    //       return {
    //         ...event,
    //         latitude: ret.data[0].latitude,
    //         longitude: ret.data[0].longitude,
    //       };
    //     }),
    //   );
    //   this.cache[url] = eventsWithLatLng.map(() => {

    //   });
    //   console.log(eventsWithLatLng);
    }
    return this.cache[url];
  }

  async getAllEvents({
    from,
    to,
    bbox,
  }: {
    from: Date;
    to: Date;
    bbox?: string;
  }) {
    return Object.values(this.cache)
      .flat()
      .filter((event) => {
        if (event.startAt < from || event.startAt > to) {
          return false;
        }

        if (bbox) {
          const parsedBBox = bbox.split(',').map(Number);
          if (
            !(
              event.latitude >= parsedBBox[0] &&
              event.latitude <= parsedBBox[2] &&
              event.longitude >= parsedBBox[1] &&
              event.longitude <= parsedBBox[2]
            )
          ) {
            return false;
          }
        }

        return true;
      });
  }
}
