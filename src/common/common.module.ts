import { Module, Global } from '@nestjs/common';
import { PUB_SUB } from './common.constants';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
@Global()
@Module({
  exports: [PUB_SUB],
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    },
  ],
})
export class CommonModule {}
