import { Component, EventEmitter, Input, Output, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

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
  @Input() maxCount: number = 0;
  @Output() requestList: EventEmitter<ListRequestArgs> = new EventEmitter();
  public query: HotelFilter = {};
  public pageNumber: number = 1;
  public perPage: number = 5;
  public filtersVisible: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public ngOnInit(): void {
    this.triggerRequestList();
  }

  public triggerRequestList(): void {
    this.requestList.next({ query: this.query, perPage: this.perPage, pageNumber: this.pageNumber });
    this.scrollToTop();
  }

  public onHotelFilterChanged(query: HotelFilter): void {
    if (JSON.stringify(query) === this.query) return;
    this.query = query;
    this.pageNumber = 1;
    this.triggerRequestList();
  }

  public onPaginationChanged(event: { perPage: number; pageNumber: number }): void {
    if (this.perPage !== event.perPage) this.pageNumber = 1;
    else this.pageNumber = event.pageNumber;
    this.perPage = event.perPage;
    this.triggerRequestList();
  }

  public toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  private scrollToTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

}
