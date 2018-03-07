import { expect } from 'chai';

import { MockHotelRepository } from '../mocks/MockHotelRepository';
import { GetHotelUseCase } from '../../usecases';
import { HotelModel } from '../../models';

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('GetHotelUseCase', () => {
  let useCase: GetHotelUseCase;
  beforeEach(() => {
    useCase = new GetHotelUseCase(new MockHotelRepository() as any);
  });

  it('should get a hotel by id', async () => {
    const hotel = await useCase.getById('5a9fb1926bbc7c6be26ed24d')
    expect(!!hotel).to.be.true
  });

  it('should get paginated hotels', async () => {
    const paginatedHotels = await useCase.getPaginated(new HotelModel({} as any), 1, 1);
    expect(typeof paginatedHotels).to.equal('object');
    expect(typeof paginatedHotels.count).to.equal('number');
    expect(typeof paginatedHotels.pageNumber).to.equal('number');
    expect(typeof paginatedHotels.perPage).to.equal('number');
    expect(paginatedHotels.list).to.an.instanceof(Array);
  });
});
