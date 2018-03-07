import { Route, Controller, Get, Put, Post, Delete, Security, Query, Body } from 'tsoa';

import { ProvideSingleton, inject } from '../ioc';
import { IHotelModel, HotelModel, PaginationModel } from '../models';
import { GetHotelUseCase, CreateHotelUseCase, UpdateHotelUseCase, DeleteHotelUseCase } from '../usecases';
import { safeParse } from '../utils';

@Route('hotel')
@ProvideSingleton(CurrencyController)
export class CurrencyController extends Controller {

  constructor(
    @inject(GetHotelUseCase) private getHotelUseCase: GetHotelUseCase,
    @inject(CreateHotelUseCase) private createHotelUseCase: CreateHotelUseCase,
    @inject(UpdateHotelUseCase) private updateHotelUseCase: UpdateHotelUseCase,
    @inject(DeleteHotelUseCase) private deleteHotelUseCase: DeleteHotelUseCase
  ) {
    super();
  }

  @Get('{id}')
  public async getById(id: string): Promise<HotelModel> {
    return this.getHotelUseCase.getById(id);
  }

  @Get()
  public async getPaginated(
    @Query('hotel') hotelStringified: string,
    @Query('pageNumber') pageNumber: number,
    @Query('perPage') perPage: number): Promise<PaginationModel> {
    const hotel: HotelModel = new HotelModel(safeParse(hotelStringified, {}));
    return this.getHotelUseCase.getPaginated(hotel, pageNumber, perPage);
  }

  @Post()
  @Security('adminUser')
  public async create(@Body() hotelParams: IHotelModel): Promise<HotelModel> {
    const hotel = new HotelModel(hotelParams);
    return this.createHotelUseCase.execute(hotel);
  }

  @Post('batch')
  @Security('adminUser')
  public async createBatch(@Body() hotelParams: IHotelModel[]): Promise<HotelModel[]> {
    const hotels = hotelParams.map(hotel => new HotelModel(hotel));
    return Promise.all(hotels.map(hotel => this.createHotelUseCase.execute(hotel)));
  }

  @Put()
  @Security('adminUser')
  public async update(@Body() hotelParams: IHotelModel): Promise<HotelModel> {
    const hotel = new HotelModel(hotelParams);
    return this.updateHotelUseCase.execute(hotel);
  }

  @Delete('{id}')
  @Security('adminUser')
  public async delete(id: string): Promise<void> {
    return this.deleteHotelUseCase.execute(id);
  }
}
