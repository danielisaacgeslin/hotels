import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { stateName, reducer, Effects } from '../../state-mgmt/hotels';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelListComponent } from './components/hotel-list';
import { HotelListContainerComponent } from './containers/hotel-list.container';
import { HotelService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(stateName, reducer.reducerFn),
    EffectsModule.forFeature([Effects]),
    HotelRoutingModule
  ],
  providers: [HotelService],
  declarations: [HotelListContainerComponent, HotelListComponent]
})
export class HotelModule { }
