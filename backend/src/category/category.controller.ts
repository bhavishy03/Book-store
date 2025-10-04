import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('categories')
export class CategoryController {
  @Get(':navigationId')
  byNavigation(@Param('navigationId') navigationId: string) {
    return [
      { id: 'fiction', name: 'Fiction', slug: 'fiction', navigationId },
      { id: 'non-fiction', name: 'Non-Fiction', slug: 'non-fiction', navigationId },
    ];
  }
}