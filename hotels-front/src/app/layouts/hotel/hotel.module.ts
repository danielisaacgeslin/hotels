import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// import {
//   stateName as productStateName,
//   reducer as productReducer,
//   Effects as productEffects
// } from '../../state-mgmt/product';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelListComponent } from './hotel-list';
import { HotelService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    // StoreModule.forFeature(),
    EffectsModule.forFeature([]),
    HotelRoutingModule
  ],
  providers: [HotelService],
  declarations: [HotelListComponent]
})
export class HotelModule { }
