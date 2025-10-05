import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductDetail, ProductDetailDocument } from './schemas/product-detail.schema';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private products: Model<ProductDocument>,
    @InjectModel(ProductDetail.name) private details: Model<ProductDetailDocument>,
    @InjectModel(Review.name) private reviews: Model<ReviewDocument>,
  ) {}

  async list(categoryId: string, page = 1, take = 24): Promise<{ page: number; total: number; items: any[] }> {
    const skip = (page - 1) * take;

    // Handle both ObjectId and string categoryId
    const or: any[] = [];
    if (isValidObjectId(categoryId)) {
      or.push({ categoryId: new Types.ObjectId(categoryId) });
    }
    or.push({ categoryId }); // in case it was saved as string

    const filter = or.length > 1 ? { $or: or } : or[0];

    const [docs, total] = await Promise.all([
      this.products.find(filter).sort({ createdAt: -1 }).skip(skip).limit(take).lean(),
      this.products.countDocuments(filter),
    ]);

    const items = docs.map((d: any) => ({
      id: d._id.toString(),
      title: d.title,
      author: d.author,
      thumbnailUrl: d.thumbnailUrl,
      priceCents: d.priceCents,
      currency: d.currency,
    }));

    return { page, total, items };
  }

  async detail(id: string): Promise<any> {
  const _id = new Types.ObjectId(id);
  const product = await this.products.findById(_id).lean();
  const productDetail = await this.details.findOne({ productId: _id }).lean();
  const reviews = await this.reviews.find({ productId: _id }).sort({ createdAt: -1 }).limit(10).lean();
  if (!product) return null;
  return { ...product, id: product._id.toString(), productDetail, reviews };
}
