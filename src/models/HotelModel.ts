import { Document } from 'mongoose';

export interface IHotelModel {
  id?: string;
  name: string;
  stars: number;
  price: number;
  image: string;
  amenities: string[];
}

export class HotelModel implements IHotelModel {
  public id: string = undefined;
  public name: string = undefined;
  public stars: number = undefined;
  public price: number = undefined;
  public image: string = undefined;
  public amenities: string[] = undefined;

  constructor(args: HotelModel | IHotelModel | Document) {
    if (!args) throw new Error('HotelModel args are missing');
    Object.keys(this).forEach(key => args[key] !== undefined ? this[key] = args[key] : null);
  }
}
