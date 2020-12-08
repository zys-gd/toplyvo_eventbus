import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

(async function () {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, {
        transport: Transport.RMQ,
        options: {
            urls: [String(process.env.RABBITMQ_CONNECTION)],
            queue: process.env.QUEUE_NAME || '',
            noAck: false,
            queueOptions: {
                durable: true
            },
        },
    });
    // eslint-disable-next-line no-console
    app.listen(() => console.log('Microservice is listening'));
})();
