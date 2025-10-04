import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller()
export class ProductController {
  @Get('products/:categoryId')
  @ApiQuery({ name: 'page', required: false, schema: { default: 1 } })
  list(@Param('categoryId') categoryId: string, @Query('page') page = '1') {
    const p = Number(page) || 1;
    return {
      page: p,
      items: Array.from({ length: 8 }, (_, i) => ({
        id: `${categoryId}-${p}-${i + 1}`,
        title: `Sample Book ${i + 1}`,
        author: 'John Doe',
        priceCents: 599,
      })),
    };
  }

  @Get('product/:id')
  detail(@Param('id') id: string) {
    return { id, title: 'Sample Book', author: 'John Doe', description: 'Demo description' };
  }
}