/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./event.entity";
import { Injectable, Logger } from "@nestjs/common";
import { AttendeeAnswerEnum } from "./attendee.entity";

/* eslint-disable prettier/prettier */
@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name);
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>
    ) {}

    private getEventsBaseQuery() {
        return this.eventsRepository
        .createQueryBuilder('e')
        .orderBy('e.id', 'DESC');
    }

    public async getEvent(id: number): Promise<Event> | undefined {
        const query = this.getEventWithAttendeeCountQuery()
        .andWhere('e.id = :id', { id });

        this.logger.debug(query.getSql());

        return await query.getOne();
    }

    public getEventWithAttendeeCountQuery() {
        return this.getEventsBaseQuery()
        .loadRelationCountAndMap(
            'e.attendeeCount', 'e.attendees'
        )
        .loadRelationCountAndMap(
            'e.attendeeAccepted',
            'e.attendees',
            'attendee',
            (qb) => qb
            .where(
                'attendee.answer = :answer',
                { answer: AttendeeAnswerEnum.Accepted}
            )
        )
        .loadRelationCountAndMap(
            'e.attendeeRejected',
            'e.attendees',
            'attendee',
            (qb) => qb
            .where(
                'attendee.answer = :answer',
                { answer: AttendeeAnswerEnum.Rejected}
            )
        )
        .loadRelationCountAndMap(
            'e.attendeeMaybe',
            'e.attendees',
            'attendee',
            (qb) => qb
            .where(
                'attendee.answer = :answer',
                { answer: AttendeeAnswerEnum.Maybe}
            )
        )
    }
}