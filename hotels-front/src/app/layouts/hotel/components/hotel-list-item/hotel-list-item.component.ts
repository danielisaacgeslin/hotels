import { Component, Input } from '@angular/core';

import { Hotel } from '../../../../models';

@Component({
  selector: 'al-hotel-list-item',
  templateUrl: './hotel-list-item.component.html',
  styleUrls: ['hotel-list-item.component.scss']
})
export class HotelListItemComponent {
  @Input() item: Hotel = new Hotel({});
}
