import { ProvideSingleton, inject } from '../ioc';
import { HotelModel, PaginationModel } from '../models';
import { HotelRepository } from '../repositories';

@ProvideSingleton(GetHotelUseCase)
export class GetHotelUseCase {

  constructor(@inject(HotelRepository) private hotelRepository: HotelRepository) { }

  public async getById(_id: string): Promise<HotelModel> {
    return new HotelModel(await this.hotelRepository.findOne({ _id }));
  }

  public async getPaginated(hotel: HotelModel, pageNumber: number, perPage: number): Promise<PaginationModel> {
    const skip: number = (Math.max(1, pageNumber) - 1) * perPage;
    const [count, list] = await Promise.all([
      this.hotelRepository.count(hotel),
      this.hotelRepository.find(hotel, skip, perPage)
    ]);
    return new PaginationModel({
      count,
      pageNumber,
      perPage,
      list: list.map(item => new HotelModel(item))
    });
  }
}
