import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {PictureModule} from '../picture/picture.module';

// import {CommentModule} from '../comment/comment.module';




import { RoundPipe} from './round.pipe';
import { HeaderComponent } from '../nav/header/header.component';
// import { newObjDialogComponent } from '../nav/newObjDialog/newObjDialog.component';

import { MaterialModule } from '@angular/material';

import { LoadingInAppComponent } from '../nav/loadingInApp/loadingInApp.component';
import { LoginInAppComponent } from '../nav/loginInApp/loginInApp.component';
// import { SideBarObjModule } from '../nav/sideBarObj/sideBarObj.module';


import {CommentModule} from '../comment/comment.module';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    // AutocompleteModule,
    PictureModule,
    // CommentModule,
    MaterialModule,
    // SideBarObjModule,



  ],
  declarations: [
    RoundPipe,
    // AutocompleteComponent,
    // TranslatePipe,
    // HeaderComponent,
    // newObjDialogComponent,
    LoadingInAppComponent,
    LoginInAppComponent,
    // SideBarObjComponent,


  ],
  exports: [
    // TranslatePipe,
    // AutocompleteModule,
    CommonModule,
    FormsModule,
    RoundPipe,
    // SideBarObjModule,
    // HeaderComponent,
    // newObjDialogComponent,
    // LoadingComponent,
    LoadingInAppComponent,
    LoginInAppComponent,
    // SideBarObjComponent,
    PictureModule,
    MaterialModule,
    // CommentModule,
    // CommentModule,
    // AutocompleteComponent,
  ],
  providers: [
    // TRANSLATION_PROVIDERS,
    // TranslateService,
  ]
})
export class SharedSmallModule { }
