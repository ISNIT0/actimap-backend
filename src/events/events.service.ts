import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/database/entity/Event.entity';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  async getEvents({
    from,
    to,
    bbox,
  }: {
    from: Date;
    to: Date;
    bbox?: number[];
  }) {
    const events = await this.eventRepository.find({
      where: {
        startAt: Between(from, to),
        ...(bbox
          ? {
              longitude: Between(bbox[0], bbox[2]),
              latitude: Between(bbox[1], bbox[3]),
            }
          : {}),
      },
    });

    return events;
  }
}
