import { Inject, Injectable } from '@nestjs/common';
import { EventDto } from '../dto/event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriberEntity } from '../entities/subscriber.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';
import { EventServiceInterface } from './event.service.interface';

@Injectable()
export class EventService implements EventServiceInterface {

    constructor(
        @InjectRepository(SubscriberEntity)
        private readonly subscriberRepository: Repository<SubscriberEntity>,
        @Inject('EVENT_SERVICE')
        private readonly client: ClientProxy,
    ) {}

    public async initEvent(eventDto: EventDto): Promise<boolean> {
        await this.subscriberRepository.save({ ...eventDto, uuid: uuid() });
        this.client.emit<number>(eventDto.eventType, eventDto.data);
        return true;
    }
}
