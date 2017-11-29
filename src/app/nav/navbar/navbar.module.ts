import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';



import { NavbarComponent} from './navbar.component';
// import {SharedModule } from '../../shared/shared.module';
// import { NotificationService} from '../../notification/notification.service';
import {SharedSmallModule } from '../../shared/sharedSmall.module';
import {MatMenuModule} from '@angular/material';
import {NotifModule} from '../notif/notif.module';

@NgModule({
  imports:      [
    // CategorieRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedSmallModule,
    MatMenuModule,
    NotifModule,
    // SharedModule,
    //  FormsModule,

    // ReactiveFormsModule,

  ],
  declarations: [

    NavbarComponent,
    // CategoriesComponent,
    // CategorieSingleComponent,
  ],
  exports:      [
    NavbarComponent
    // CategoriesComponent
  ],
  providers:    [
    // NotificationService,
    // CategorieService
  ],
  entryComponents: [ ]
})
export class NavbarModule { }
