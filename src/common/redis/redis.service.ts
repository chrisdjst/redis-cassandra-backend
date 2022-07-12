import { Injectable } from '@nestjs/common';
import { createClient, RedisModules } from 'redis';
import { Client } from 'redis-om';
import { redisConstants } from './redis.constants';

@Injectable()
export class RedisService {
  client: Client;
  redis;
  async createRedis() {
    try {
      this.redis = createClient({
        username: redisConstants.username,
        password: redisConstants.password,
        database: 0,
        socket: {
          host: redisConstants.host,
          port: redisConstants.port,
          rejectUnauthorized: false,
        },
      });
      await this.redis.connect();
      return this.redis;
    } catch (err) {
      console.log('erro', err);
    }
  }

  async createClient() {
    await this.createRedis();
    return (this.client = await new Client().use(this.redis));
  }
}
