import { Component, Input } from '@angular/core';

@Component({
  selector: 'al-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent {
  public innerCount: undefined[] = [undefined];
  @Input() set count (count: number) {
    this.innerCount = Array.from(Array(count));
  }

}
