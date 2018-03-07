import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Hotel } from '../../../models';
import { ListRequestArgs } from '../../../services';
import { reducer, actions } from '../../../state-mgmt/hotels';

@Component({
  selector: 'al-hotel-list-container',
  template: `<al-hotel-list
    [hotelList]="hotelList$ | async"
    [maxCount]="maxCount$ | async"
    (requestList)="onRequestList($event)">
    </al-hotel-list>`
})
export class HotelListContainerComponent {
  public hotelList$: Observable<Hotel[]> = this.store.select(reducer.getList);
  public maxCount$: Observable<number> = this.store.select(reducer.getMaxCount);
  constructor(private store: Store<reducer.State>) { }

  public onRequestList(event: ListRequestArgs): void {
    this.store.dispatch(new actions.FetchHotels(event));
  }
}
