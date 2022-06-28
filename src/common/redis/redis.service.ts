import { Injectable } from '@nestjs/common';
import { createClient, RedisModules } from 'redis'
import { Client } from 'redis-om'
import { redisConstants } from './redis.constants';

@Injectable()
export class RedisService {
  client: Client
  redis
  async createRedis() {
    try{
      this.redis =  createClient ({
        //url: 'redis://default:vH4YlPERoZwiPg3XfZl67Oy5lsPD59gu@redis-19027.c85.us-east-1-2.ec2.cloud.redislabs.com:19027',
        //url: redisConstants.urlLocal,
        username: redisConstants.username,
        password: redisConstants.password,
        database: 0,
        socket: {
          host: redisConstants.host,
          port: redisConstants.port,
          rejectUnauthorized: false,
        }
        // database: redisConstants.database,
        // socket: {
        //   host: redisConstants.hostLocal,
        //   port: redisConstants.portLocal,
        //   rejectUnauthorized: false,
        // }
      })
      //this.redis.on('error', (err) => console.log('Redis Client Error', err));
      await this.redis.connect()
      return this.redis
    }catch(err){
      console.log('erro', err);
    }
    
  }

  async createClient() {
    await this.createRedis()
    return (this.client = await new Client().use(this.redis));
  }
}
/* const redis = createClient('redis://localhost:6379')
await redis.connect()
const client = await new Client().use(redis)

await redis.set('foo', 'bar')
const value = await client.execute(['GET', 'foo']) */