import { ProvideSingleton, inject } from '../ioc';
import { HotelModel } from '../models';
import { HotelRepository } from '../repositories';

@ProvideSingleton(UpdateHotelUseCase)
export class UpdateHotelUseCase {

  constructor(@inject(HotelRepository) private hotelRepository: HotelRepository) { }

  public async execute(hotel: HotelModel): Promise<HotelModel> {
    return new HotelModel(await this.hotelRepository.update(hotel.id, hotel));
  }
}
