import { expect } from 'chai';

import { MockHotelRepository } from '../mocks/MockHotelRepository';
import { CreateHotelUseCase } from '../../usecases';
import { HotelModel } from '../../models';

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('CreateHotelUseCase', () => {
  let useCase: CreateHotelUseCase;
  beforeEach(() => {
    useCase = new CreateHotelUseCase(new MockHotelRepository() as any);
  });

  it('should create a hotel', async () => {
    const hotel = await useCase.execute(new HotelModel({} as any));
    expect(!!hotel).to.be.true
  });
});
