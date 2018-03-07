import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'al-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {
  @Input() pageNumber: number = 1;
  @Input() perPage: number = 10;
  @Input() lastPageNumber: number = 0;
  @Output() paginationChanged: EventEmitter<{ pageNumber: number; perPage: number }> = new EventEmitter();
  public formGroup: FormGroup;
  private destroy$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      pageNumber: new FormControl(this.pageNumber),
      perPage: new FormControl(this.perPage)
    });
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap(values => this.paginationChanged.next(values))
    ).subscribe();
  }

  public goForward(): void {
    this.formGroup.controls.pageNumber.setValue(this.pageNumber + 1);
  }

  public goBackwards(): void {
    this.formGroup.controls.pageNumber.setValue(this.pageNumber - 1);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
