import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HotelListContainerComponent } from './containers/hotel-list.container';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: HotelListContainerComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class HotelRoutingModule { }
