import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDetailDocument = HydratedDocument<ProductDetail>;

@Schema({ timestamps: true })
export class ProductDetail {
  @Prop({ type: Types.ObjectId, ref: 'Product', unique: true, required: true })
  productId: Types.ObjectId;

  @Prop() isbn?: string;
  @Prop() description?: string;
  @Prop() imageLarge?: string;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
ProductDetailSchema.index({ productId: 1 }, { unique: true });