import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevController } from './dev.controller';
import { Navigation, NavigationSchema } from '../navigation/navigation.schema';
import { Category, CategorySchema } from '../category/category.schema';
import { Product, ProductSchema } from '../product/schemas/product.schema';
import { ProductDetail, ProductDetailSchema } from '../product/schemas/product-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Navigation.name, schema: NavigationSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
    ]),
  ],
  controllers: [DevController],
})
export class DevModule {}