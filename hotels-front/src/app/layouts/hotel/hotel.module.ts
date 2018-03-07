import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { stateName, reducer, Effects } from '../../state-mgmt/hotels';
import { SharedModule } from '../../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelListComponent } from './components/hotel-list';
import { HotelListItemComponent } from './components/hotel-list-item';
import { HotelFilterComponent } from './components/hotel-filter';
import { HotelListContainerComponent } from './containers/hotel-list.container';
import { HotelService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(stateName, reducer.reducerFn),
    EffectsModule.forFeature([Effects]),
    SharedModule,
    HotelRoutingModule
  ],
  providers: [HotelService],
  declarations: [
    HotelListContainerComponent,
    HotelListComponent,
    HotelListItemComponent,
    HotelFilterComponent
  ]
})
export class HotelModule { }
