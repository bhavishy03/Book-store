import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true }) title: string;
  @Prop() author?: string;
  @Prop() thumbnailUrl?: string;
  @Prop() priceCents?: number;
  @Prop({ default: 'GBP' }) currency?: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ unique: true, required: true })
  sourceUrl: string;

  @Prop() sourceId?: string;
  @Prop() lastScrapedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Indexes
ProductSchema.index({ sourceUrl: 1 }, { unique: true });
ProductSchema.index({ categoryId: 1, createdAt: -1 });