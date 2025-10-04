import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('navigation')
@Controller('navigation')
export class NavigationController {
  @Get()
  list() {
    return [
      { id: 'books', name: 'Books', slug: 'books' },
      { id: 'childrens-books', name: "Children's Books", slug: 'childrens-books' },
    ];
  }
}