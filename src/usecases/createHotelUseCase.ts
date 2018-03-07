import { ProvideSingleton, inject } from '../ioc';
import { HotelModel } from '../models';
import { HotelRepository } from '../repositories';

@ProvideSingleton(CreateHotelUseCase)
export class CreateHotelUseCase {

  constructor(@inject(HotelRepository) private hotelRepository: HotelRepository) { }

  public async execute(hotel: HotelModel): Promise<HotelModel> {
    return new HotelModel(await this.hotelRepository.create(hotel));
  }
}
