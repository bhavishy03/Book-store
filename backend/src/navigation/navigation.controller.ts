import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NavigationService } from './navigation.service';

@ApiTags('navigation')
@Controller('navigation')
export class NavigationController {
  constructor(private readonly nav: NavigationService) {}

  @Get()
  list() {
    return this.nav.list();
  }

  @Post('dev/seed')
  seed() {
    return this.nav.seed();
  }
}