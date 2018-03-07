import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { reducers, initialState } from './state-mgmt/root-reducer';

import { RoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './layouts/not-found';
import { HeaderComponent } from './layouts/header';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, initialState),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([]),
    RoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
