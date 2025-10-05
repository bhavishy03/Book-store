import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller()
export class ProductController {
  constructor(private products: ProductService) {}

  @Get('products/:categoryId')
  @ApiQuery({ name: 'page', required: false, schema: { default: 1 } })
  list(
    @Param('categoryId') categoryId: string,
    @Query('page') page = '1',
  ): Promise<{ page: number; total: number; items: any[] }> {
    return this.products.list(categoryId, Number(page) || 1);
  }

  @Get('product/:id')
  detail(@Param('id') id: string): Promise<any> {
    return this.products.detail(id);
  }
}