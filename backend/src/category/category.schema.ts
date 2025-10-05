import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) slug: string;

  @Prop({ type: Types.ObjectId, ref: 'Navigation', required: true })
  navigationId: Types.ObjectId;

  @Prop({ unique: true, sparse: true }) sourceUrl?: string;
  @Prop() lastScrapedAt?: Date;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ navigationId: 1, slug: 1 }, { unique: true });
CategorySchema.index({ sourceUrl: 1 }, { unique: true, sparse: true });