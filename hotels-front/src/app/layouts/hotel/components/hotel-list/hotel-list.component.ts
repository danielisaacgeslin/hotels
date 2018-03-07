import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Hotel } from '../../../../models';
import { ListRequestArgs } from '../../../../services';
import { HotelFilter } from '../hotel-filter';

@Component({
  selector: 'al-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  @Input() hotelList: Hotel[] = [];
  @Output() requestList: EventEmitter<ListRequestArgs> = new EventEmitter();

  public ngOnInit(): void {
    this.triggerRequestList();
  }

  public triggerRequestList(query: HotelFilter = {}): void {
    this.requestList.next({ query, perPage: 0, pageNumber: 1 });
  }
}
