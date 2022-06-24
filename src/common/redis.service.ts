import * as redis from 'redis';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  constructor(private readonly configService: ConfigService) {
    this.init();
  }
  private async init() {
    this.client.on('error', (err) => {
      console.log('Redis Client Error', err);
    });
    console.log('redis on ' + this.HOST + ':' + this.PORT);
  }

  private HOST = this.configService.get('REDIS_HOST') || '127.0.0.1';
  private PORT = +this.configService.get('REDIS_PORT') || 6379;

  private client: redis.RedisClient = redis.createClient(this.PORT, this.HOST);

  getRedis: (key: string) => Promise<string | null> = promisify(
    this.client.get,
  ).bind(this.client);

  setRedis: (key: string, value: string) => Promise<string | null> = promisify(
    this.client.set,
  ).bind(this.client);

  setRedisTemporarily: (
    key: string,
    value: string,
    EX: string, //set 'EX'
    duration: number, //ex 24h 60 * 60 * 24
  ) => Promise<string | null> = promisify(this.client.set).bind(this.client);

  delRedis: (key: string) => Promise<number> = promisify(this.client.del).bind(
    this.client,
  );
}
