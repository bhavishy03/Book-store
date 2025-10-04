import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health') // final route: /api/health/*
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('db') // final endpoint: /api/health/db
  health() {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const state = states[this.connection.readyState] ?? this.connection.readyState;
    return { state, ok: this.connection.readyState === 1 };
  }
}