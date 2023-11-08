/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { Repository } from 'typeorm';
import { Controller, Get } from '@nestjs/common';

@Controller('/attendees')
export class AttendeesController {
  constructor(
    @InjectRepository(Attendee)
    private readonly repository: Repository<Attendee>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }
}
