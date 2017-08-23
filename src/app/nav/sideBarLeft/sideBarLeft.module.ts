import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';

import { MaterialModule } from '@angular/material';

import { SideBarLeftComponent} from './sideBarLeft.component';
import {SharedModule } from '../../shared/shared.module';

@NgModule({
  imports:      [
    // ProductRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    //  FormsModule,
    // MaterialModule,
    // ReactiveFormsModule,

  ],
  declarations: [

    SideBarLeftComponent,
    // ProductsComponent,
    // ProductSingleComponent,
  ],
  exports:      [
    SideBarLeftComponent
    // ProductsComponent
  ],
  providers:    [
    // ProductService
  ],
  entryComponents: [ ]
})
export class SideBarLeftModule { }
