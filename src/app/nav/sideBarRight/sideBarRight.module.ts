import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';

import { MaterialModule } from '@angular/material';

import { SideBarRightComponent} from './sideBarRight.component';
import {SharedObjModule } from '../../shared/sharedObj.module';
// import { NotificationService} from '../../notification/notification.service';
// import {UserModule} from '../../user/user.module';
// import {NewUserComponent} from '../../user/singleUser/newUser.component';
// import {QuoteModule} from '../../quote/quote.module'
// import {SharedSmallModule } from '../../shared/sharedSmall.module';



@NgModule({
  imports:      [
    // UserModule,
    // ProductRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NewUserComponent,
    // QuoteModule,
    // SharedSmallModule
    SharedObjModule,

    //  FormsModule,
    MaterialModule,
    // ReactiveFormsModule,

  ],
  declarations: [

    SideBarRightComponent,
    // NewUserComponent,
    // ProductsComponent,
    // ProductSingleComponent,
  ],
  exports:      [
    SideBarRightComponent
    // ProductsComponent
  ],
  providers:    [
    // NotificationService,
    // ProductService
  ],
  entryComponents: [ ]
})
export class SideBarRightModule { }
