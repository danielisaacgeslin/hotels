import { Action } from '@ngrx/store';

import { Hotel } from '../../models';
import { stateName } from './state-name';

export const actionTypes = {
  FETCH_HOTELS: `[${stateName}] Fetch hotels`,
  SET_HOTELS: `[${stateName}] Set hotels`
};

export class FetchHotels implements Action {
  public type: string = actionTypes.FETCH_HOTELS;
  constructor(public payload: { pageNumber: number; perPage: number; query: Hotel }) { }
}

export class SetHotels implements Action {
  public type: string = actionTypes.SET_HOTELS;
  constructor(public payload: Hotel[]) { }
}
