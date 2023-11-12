/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { FindOneOptions, Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
    private readonly eventsService: EventsService
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        { id: MoreThan(3), when: MoreThan(new Date('2021-02-12T13:00:00')) },
        { description: Like('%meet%') },
      ],
      take: 2,
      order: {
        id: 'DESC'
      }
    });
  }

  @Get('practice2')
  async practice2() {
    // const options: FindOneOptions<Event> = {
    //   where: { id: 1 },
    //   relations: ['attendees'],  
    // };
  
    // return await this.repository.findOne(options);
    // const options: FindOneOptions<Event> = {
    // where: { id: 1 },
    // };
    // const event = await this.repository.findOne(options);
    const event = new Event();
    event.id = 1;

    const attendee = new Attendee();
    attendee.name = 'as 2';
    attendee.event = event;

    await this.attendeeRepository.save(attendee);

    return event;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.eventsService.getEvent(id);
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOne(id);

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id);
    await this.repository.remove(event);
  }
}
