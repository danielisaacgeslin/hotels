import { ProvideSingleton, inject } from '../ioc';
import { HotelRepository } from '../repositories';

@ProvideSingleton(DeleteHotelUseCase)
export class DeleteHotelUseCase {

  constructor(@inject(HotelRepository) private hotelRepository: HotelRepository) { }

  public async execute(id: string): Promise<void> {
    return this.hotelRepository.delete(id);
  }
}
