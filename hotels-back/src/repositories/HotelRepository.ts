import { Query, Mongoose, Schema, Model, Document, Types } from 'mongoose';

import { ProvideSingleton, inject } from '../ioc';
import { DbConnection } from '../config/DbConnection';
import { HotelModel } from '../models';

@ProvideSingleton(HotelRepository)
export class HotelRepository {
  public hotelSchema: Schema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    stars: { type: Number, min: 1, max: 5, default: 1 },
    price: { type: Number, default: 0 },
    image: { type: String },
    amenities: { type: [String] }
  });
  public model: Model<Document> = this.dbConnection.db.model('hotels', this.hotelSchema);

  constructor(@inject(DbConnection) private dbConnection: DbConnection) { }

  public async create(hotel: HotelModel): Promise<Document> {
    return this.model.create(hotel);
  }

  public async update(_id: string, hotel: HotelModel): Promise<Document> {
    return this.model.updateOne({ _id }, hotel);
  }

  public async delete(_id: string): Promise<void> {
    return this.model.deleteOne({ _id });
  }

  public async find(query: any, skip: number = 0, limit: number = 250): Promise<Document[]> {
    return this.model.find(this.cleanQuery(query)).skip(skip).limit(limit);
  }

  public async findOne(query: any): Promise<Document> {
    return this.model.findOne(this.cleanQuery(query));
  }

  public async count(query: any): Promise<number> {
    return this.model.count(this.cleanQuery(query));
  }

  private cleanQuery(query: any): any {
    if (!query || typeof query !== 'object') return query;
    query = { ...query };
    if (query.id) {
      query._id = query.id;
      delete query.id;
    }
    Object.keys(query).forEach(key => {
      if (query[key] === undefined) delete query[key];
      if(typeof query[key] === 'string') query[key] = new RegExp(query[key], 'i');
    });
    return query;
  }

}
