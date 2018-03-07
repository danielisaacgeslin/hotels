import { HotelModel } from '../../models';

export class MockHotelRepository {
  private hotelMock = new HotelModel({
    id: "5a9fb1926bbc7c6be26ed24d",
    name: "Hotel Stefanos",
    stars: 3,
    price: 994.18,
    image: "4900059_30_b.jpg",
    amenities: [
      'safety-box',
      'nightclub',
      'deep-soaking-bathtub',
      'beach',
      'business-center'
    ]
  });

  public async create(hotel: HotelModel): Promise<Document> {
    if (hotel) return Promise.resolve({ ...hotel, ...{ id: '5a9fb1926bbc7c6be26ed24d' } } as any);
    else return Promise.reject(null);
  }

  public async update(_id: string, hotel: HotelModel): Promise<Document> {
    if (hotel && _id) return Promise.resolve({ ...hotel, ...{ id: _id } } as any);
    else return Promise.reject(null);
  }

  public async delete(_id: string): Promise<void> {
    if (_id) return Promise.resolve(null);
    else return Promise.reject(null);
  }

  public async find(query: any, skip: number = 0, limit: number = 250): Promise<Document[]> {
    if (query) return Promise.resolve([this.hotelMock as any]);
    else return Promise.reject(null);
  }

  public async findOne(query: any): Promise<Document> {
    if (query) return Promise.resolve(this.hotelMock as any);
    else return Promise.reject(null);
  }

  public async count(query: any): Promise<number> {
    return Promise.resolve(1);
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
    });
    return query;
  }

}
