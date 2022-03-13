import axios from 'axios';
import { Event } from 'src/database/entity/Event.entity';
import { createConnection } from 'typeorm';
import ical from 'node-ical';
import { ENETDOWN } from 'constants';

const eventICSUrls = [
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706798.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/8635344.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/8635345.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706798.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706738.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706740.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706747.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706750.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706757.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/9706760.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/8636713.ics',
  'https://ics.teamup.com/feed/ksq9pyko3omkgssrmh/8636709.ics',
];

async function run() {
  const connection = await createConnection();
  console.info('Deleting existing data');
  const eventRepo = connection.getRepository(Event);

  try {
    await eventRepo.delete({});
    console.info(`Deleted existing data`);
  } catch (err) {
    console.error(`Failed to delete existing data`);
    throw err;
  }

  console.info(`Creating mockdata...`);

  for (const url of eventICSUrls) {
    const { data: icsContent } = await axios.get(url);
    const events = ical.sync.parseICS(icsContent);

    const eventsWithLatLng: any[] = Object.values(events);
    for (const event of eventsWithLatLng) {
      const { data: ret } = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_API_KEY}&query=${event.location}`,
      );
      if (ret.data[0] && ret.data[0].latitude && ret.data[0].longitude) {
        event.latitude = ret.data[0].latitude;
        event.longitude = ret.data[0].longitude;
      }
    }

    await eventRepo.save(
      eventsWithLatLng
        .filter(
          (event) =>
            event &&
            event.type !== 'VTIMEZONE' &&
            event.latitude &&
            event.longitude,
        )
        .map((event: any) => {
          console.log(event.start);
          return eventRepo.create({
            summary: event.summary || '',
            description: event.description || '',
            latitude: event.latitude,
            longitude: event.longitude,
            contact: `${event['TEAMUP-WHO']} ${event['TEAMUP-CONTACT-NUMBER']}`,
            startAt: event.start || new Date(),
            duration: 'PT2H',
          });
        }),
    );
  }

  // for (let i = 0; i < 10; i++) {
  //   const randomDayOffset = Math.floor(Math.random() * 14) - 4;
  //   const startAt = new Date();
  //   startAt.setDate(startAt.getDate() + randomDayOffset);

  //   const latitudeOffset = Math.random() * 0.01 - 0.025;
  //   const longitudeOffset = Math.random() * 0.01 - 0.025;

  //   const event = new Event();
  //   Object.assign(event, {
  //     summary: 'Canvassing in Kennington',
  //     startAt,
  //     duration: 'PT2H',
  //     whatsApp: 'https://chat.whatsapp.com/I1TjnmvYbGPFbPlavOtLkP',
  //     latitude: 51.504425 + latitudeOffset,
  //     longitude: -0.1291608 + longitudeOffset,
  //     description: 'Test for Roberto',
  //     contact: 'Filip',
  //   });
  //   await eventRepo.save(event);
  // }

  console.info(`Created mockdata`);
}

run().then(
  () => console.log(`Executed successfully`),
  (err) => {
    console.error(`Failed to create developer mockdata`);
    throw err;
  },
);
