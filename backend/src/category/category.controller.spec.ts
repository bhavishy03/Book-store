import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor(private categories: CategoryService) {}
  @Get(':navigationId')
  byNavigation(@Param('navigationId') navigationId: string) {
    return this.categories.listByNavigation(navigationId);
  }
}