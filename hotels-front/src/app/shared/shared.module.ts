import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginatorComponent } from './paginator';
import { StarComponent } from './star';

const components = [PaginatorComponent, StarComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: components,
  exports: components
})
export class SharedModule { }
