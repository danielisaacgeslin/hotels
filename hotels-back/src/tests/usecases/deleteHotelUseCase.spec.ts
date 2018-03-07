import { expect } from 'chai';

import { MockHotelRepository } from '../mocks/MockHotelRepository';
import { DeleteHotelUseCase } from '../../usecases';
import { HotelModel } from '../../models';

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('DeleteHotelUseCase', () => {
  let useCase: DeleteHotelUseCase;
  beforeEach(() => {
    useCase = new DeleteHotelUseCase(new MockHotelRepository() as any);
  });

  it('should update a hotel', async () => {
    return useCase.execute('5a9fb1926bbc7c6be26ed24d');
  });
});
