import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Navigation, NavigationDocument } from '../navigation/navigation.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categories: Model<CategoryDocument>,
    @InjectModel(Navigation.name) private navs: Model<NavigationDocument>,
  ) {}

  // GET /categories/:navigationId
  async listByNavigation(navigationIdOrSlug: string) {
    const navId = await this.resolveNavId(navigationIdOrSlug);
    if (!navId) return [];
    const docs = await this.categories.find({ navigationId: navId }).sort({ name: 1 }).lean();
    return docs.map(d => ({
      id: d._id.toString(),
      name: d.name,
      slug: d.slug,
      navigationId: d.navigationId.toString(),
    }));
  }

  // POST /categories/dev/seed/:navigationId
  async seedForNavigation(navigationIdOrSlug: string) {
    const navId = await this.resolveNavId(navigationIdOrSlug);
    if (!navId) return { ok: false, message: 'Navigation not found' };

    const items = [
      { name: 'Fiction', slug: 'fiction' },
      { name: 'Non-Fiction', slug: 'non-fiction' },
    ];
    for (const it of items) {
      await this.categories.updateOne(
        { navigationId: navId, slug: it.slug },
        { $set: { ...it, navigationId: navId } },
        { upsert: true },
      );
    }
    const count = await this.categories.countDocuments({ navigationId: navId });
    return { ok: true, count };
  }

  private async resolveNavId(navigationIdOrSlug: string): Promise<Types.ObjectId | null> {
    if (isValidObjectId(navigationIdOrSlug)) return new Types.ObjectId(navigationIdOrSlug);
    const nav = await this.navs.findOne({ slug: navigationIdOrSlug }).lean();
    return nav?._id ? (nav._id as Types.ObjectId) : null;
  }
}