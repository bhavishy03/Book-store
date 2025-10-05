import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NavigationDocument = HydratedDocument<Navigation>;

@Schema({ timestamps: true })
export class Navigation {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) slug: string;
  @Prop() sourceUrl?: string;
  @Prop() lastScrapedAt?: Date;
}

export const NavigationSchema = SchemaFactory.createForClass(Navigation);
NavigationSchema.index({ slug: 1 }, { unique: true });