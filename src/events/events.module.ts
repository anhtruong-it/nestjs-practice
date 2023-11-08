/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { AttendeesController } from './attendees.controller';
import { Attendee } from './attendee.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Attendee]),
    ],
    controllers: [EventsController, AttendeesController]
})
export class EventsModule {};
