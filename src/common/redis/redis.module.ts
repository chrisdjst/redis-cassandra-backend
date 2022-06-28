import { Module } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { RedisModule } from 'nestjs-redis';
import { redisConstants } from './redis.constants';

@Module({
  providers: [RedisService],
  exports: [RedisService],
  imports: [
    RedisModule.register({
      host: 'redis-19027.c85.us-east-1-2.ec2.cloud.redislabs.com:19027',
      password: 'vH4YlPERoZwiPg3XfZl67Oy5lsPD59gu',
    }),
  ],
})
export class redisModule {}
