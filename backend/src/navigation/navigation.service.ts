import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Navigation, NavigationDocument } from './navigation.schema';

@Injectable()
export class NavigationService {
  constructor(@InjectModel(Navigation.name) private model: Model<NavigationDocument>) {}

  async list() {
  const docs = await this.model.find().sort({ name: 1 }).lean();
  return docs.map(d => ({
    id: d._id.toString(),   // ← MongoDB ka _id string me convert
    name: d.name,
    slug: d.slug,
  }));
}


  async seed() {
    const items = [
      { name: 'Books', slug: 'books' },
      { name: "Children's Books", slug: 'childrens-books' },
    ];
    for (const it of items) {
      await this.model.updateOne({ slug: it.slug }, { $set: it }, { upsert: true });
    }
    return { ok: true, count: items.length };
  }
}