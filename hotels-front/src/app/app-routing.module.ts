import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { CustomRouterStateSerializer } from './utils';
import { NotFoundComponent } from './layouts/not-found';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hotel',
    pathMatch: 'full'
  },
  {
    path: 'hotel',
    loadChildren: './layouts/hotel/hotel.module#HotelModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: false }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  exports: [RouterModule],
  providers: [{
    provide: RouterStateSerializer,
    useClass: CustomRouterStateSerializer
  }],
  declarations: []
})
export class RoutingModule { }
