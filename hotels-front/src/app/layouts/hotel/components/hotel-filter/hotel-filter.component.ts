import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil, tap, debounceTime, map } from 'rxjs/operators';

export interface HotelFilter {
  name?: string;
  stars?: number;
}

@Component({
  selector: 'al-hotel-filter',
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['hotel-filter.component.scss']
})
export class HotelFilterComponent implements OnInit, OnDestroy {
  @Input() debounceTime: number = 500;
  @Output() filter: EventEmitter<HotelFilter> = new EventEmitter();
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    stars: new FormControl()
  });
  private destroy$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.debounceTime),
      map(data => {
        Object.keys(data).forEach(key => {
          if (!data[key]) delete data[key];
        });
        return data;
      }),
      tap(data => this.filter.emit(data))
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
