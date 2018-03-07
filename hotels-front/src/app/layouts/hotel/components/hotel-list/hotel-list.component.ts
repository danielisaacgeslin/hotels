import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Hotel } from '../../../../models';
import { ListRequestArgs } from '../../../../services';

@Component({
  selector: 'al-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  @Input() hotelList: Hotel[] = [];
  @Output() requestList: EventEmitter<ListRequestArgs> = new EventEmitter();

  public ngOnInit(): void {
    this.requestList.next({ query: {}, perPage: 10, pageNumber: 1 });
  }
}
