import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

import { Hotel, Pagination } from '../../models';
import { actionTypes, FetchHotels, SetHotels } from './actions';
import { State } from './reducer';
import { HotelService } from '../../services/';

@Injectable()
export class Effects {
  @Effect()
  public fetchHotels$: Observable<Action> = this.actions$
    .ofType<FetchHotels>(actionTypes.FETCH_HOTELS).pipe(
      switchMap(action => this.hotelService.getList(action.payload)),
      map(res => new SetHotels(res.list))
    );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private hotelService: HotelService) { }
}
