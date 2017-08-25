import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';

import { MaterialModule } from '@angular/material';

import { NewObjComponent} from './newObj.component';
// import {SharedModule } from '../../shared/shared.module';
import { NotificationService} from '../../notification/notification.service';


@NgModule({
  imports:      [
    // ProductRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SharedModule,
    //  FormsModule,
    // MaterialModule,
    // ReactiveFormsModule,

  ],
  declarations: [

    NewObjComponent,
    // ProductsComponent,
    // ProductSingleComponent,
  ],
  exports:      [
    NewObjComponent
    // ProductsComponent
  ],
  providers:    [
    // NotificationService,
    // ProductService
  ],
  entryComponents: [ ]
})
export class NewObjModule { }
