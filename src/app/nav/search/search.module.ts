import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';



import { SearchComponent} from './search.component';
import {SharedSmallModule } from '../../shared/sharedSmall.module';
// import { NotificationService} from '../../notification/notification.service';

@NgModule({
  imports:      [
    // CategorieRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedSmallModule,
    // SharedModule,
    //  FormsModule,

    // ReactiveFormsModule,

  ],
  declarations: [

    SearchComponent,
    // CategoriesComponent,
    // CategorieSingleComponent,
  ],
  exports: [
    SearchComponent
    // CategoriesComponent
  ],
  providers:    [
    // NotificationService,
    // CategorieService
  ],
  entryComponents: [ ]
})
export class SearchModule { }
