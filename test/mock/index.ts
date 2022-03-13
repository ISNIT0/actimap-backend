import { Event } from 'src/database/entity/Event.entity';
import { createConnection } from 'typeorm';

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

  for (let i = 0; i < 10; i++) {
    const randomDayOffset = Math.floor(Math.random() * 14) - 4;
    const startAt = new Date();
    startAt.setDate(startAt.getDate() + randomDayOffset);

    const latitudeOffset = Math.random() * 0.01 - 0.025;
    const longitudeOffset = Math.random() * 0.01 - 0.025;

    const event = new Event();
    Object.assign(event, {
      summary: 'Canvassing in Kennington',
      startAt,
      duration: 'PT2H',
      whatsApp: 'https://chat.whatsapp.com/I1TjnmvYbGPFbPlavOtLkP',
      latitude: 51.504425 + latitudeOffset,
      longitude: -0.1291608 + longitudeOffset,
      description: 'Test for Roberto',
      contact: 'Filip',
    });
    await eventRepo.save(event);
  }

  console.info(`Created mockdata`);
}

run().then(
  () => console.log(`Executed successfully`),
  (err) => {
    console.error(`Failed to create developer mockdata`);
    throw err;
  },
);
