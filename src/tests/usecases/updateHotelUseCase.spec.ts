import { expect } from 'chai';

import { MockHotelRepository } from '../mocks/MockHotelRepository';
import { UpdateHotelUseCase } from '../../usecases';
import { HotelModel } from '../../models';

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('UpdateHotelUseCase', () => {
  let useCase: UpdateHotelUseCase;
  beforeEach(() => {
    useCase = new UpdateHotelUseCase(new MockHotelRepository() as any);
  });

  it('should update a hotel', async () => {
    const hotel = await useCase.execute(new HotelModel({ id: '5a9fb1926bbc7c6be26ed24d' } as any));
    expect(!!hotel).to.be.true
  });
});
