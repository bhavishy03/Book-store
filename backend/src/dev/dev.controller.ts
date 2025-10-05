import { Controller, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../product/schemas/product.schema';
import { ProductDetail } from '../product/schemas/product-detail.schema';

@Controller('dev')
export class DevController {
  constructor(
    @InjectModel(Product.name) private products: Model<any>,
    @InjectModel(ProductDetail.name) private details: Model<any>,
  ) {}

  @Post('seed-products/:categoryId')
  async seedProducts(@Param('categoryId') categoryId: string) {
    const catId = new Types.ObjectId(categoryId);
    const titles = Array.from({ length: 8 }).map((_, i) => `Seed Book ${i + 1}`);

    for (let i = 0; i < titles.length; i++) {
      const p = await this.products.findOneAndUpdate(
        { sourceUrl: `seed://p-${i + 1}` },
        {
          $set: {
            title: titles[i],
            author: 'Seed Author',
            thumbnailUrl: null,
            priceCents: 599 + i * 10,
            currency: 'GBP',
            categoryId: catId,
            sourceUrl: `seed://p-${i + 1}`,
          },
        },
        { upsert: true, new: true },
      );

      await this.details.updateOne(
        { productId: p._id },
        {
          $set: {
            productId: p._id,
            description: 'This is a seeded product description.',
            imageLarge: null,
          },
        },
        { upsert: true },
      );
    }

    const count = await this.products.countDocuments({ categoryId: catId });
    return { ok: true, count };
  }
}