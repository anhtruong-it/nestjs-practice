/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { AttendeesController } from './attendees.controller';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Attendee]),
    ],
    controllers: [EventsController, AttendeesController],
    providers: [EventsService]
})
export class EventsModule {};
