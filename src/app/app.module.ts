import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, RequestOptions, Http} from '@angular/http';
import { AppComponent} from './app.component';
// import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MatSidenavModule} from '@angular/material';


import { SideBarRightModule} from './nav/sideBarRight/sideBarRight.module';
import { SideBarLeftModule} from './nav/sideBarLeft/sideBarLeft.module';
import { NavbarModule} from './nav/navbar/navbar.module';


import { GlobalEventsManager } from './globalEventsManager';

//
// import { ProgressBarModule} from 'ng2-progress-bar';
import { RouterModule} from '@angular/router';
import { CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthHttp, AuthConfig} from 'angular2-jwt';

import { ToastModule} from 'ng2-toastr/ng2-toastr';
import { ToastOptions} from 'ng2-toastr';
import { CustomOption } from './toast-options';

import { FooterComponent} from './nav/footer/footer.component';

import { LoadingComponent} from './nav/loading/loading.component';
import { UserModule} from './user/user.module';



import { AutocompleteComponent } from './autocomplete/autocomplete.component'




import { AppRoutingModule} from './appRouting.module';

import { AuthGuardService} from './auth/authguard.service';
import { AuthService} from './auth/auth.service';
import { ErrorService} from './errorHandler/error.service';


import { ErrorComponent} from './errorHandler/error.component';


import { HomeComponent} from './home/home.component';
import { HomeService} from './home/home.service';




import { ErrorPageComponent} from './errorPage/errorPage.component';

import { AdminService} from './admin/services/admin.service';


import { AdminGuardService} from './admin/services/adminGuard';
import { CompanieGuardService} from './companie/companieGuard.service';
// import { PaiementGuardService} from './user/paiement/paiementGuard.service';


import { AdminComponent} from './admin/admin.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoadingComponent,
    // NavbarComponent,
  //  CalendarComponent,

    // AutocompleteComponent,
    // CategorieComponent,
    // CategoriesComponent,
    // NewCategorieComponent,
    // SingleCategorieComponent,

    // DeleteDialog,
    // SeePictureDialogComponent,


    // PressComponent,
    // PressesComponent,
    // PressSingleComponent,
    //



    // UserComponent,
    // NewUserComponent,
    // SingleUserComponent,
    // AddNoteComponent,
    // ChooseDateComponent,
    // UserPicturesComponent,
    // AddCategoriesToUserComponent,
    // UserCategoriesHistory,
    //
    //
    // RegisterComponent,





    ErrorComponent,

    // HomeComponent,


    // CompanieDetailUsersComponent,
    // CompaniePicturesComponent,
    // CompaniesComponent,
    // CompanieComponent,
    // EditCompanieComponent,
    // EditAddUserToCompanieComponent,
    // CompanieDetailComponent,
    // CompanieFilterPipe,


  //  CompanieAddUserDialog,




    // FormComponent,

    ErrorPageComponent,

  //  AdminUsersComponent,

    // EditOptionsComponentDialog,
    AdminComponent,


  ],
  imports: [


    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    // ProgressBarModule,
    FormsModule,

    // NavbarModule,
    // SidebarModule,
    MatSidenavModule,
    // CKEditorModule,
    // NgbModule.forRoot(),
    UserModule,
    // AutocompleteComponent,

  //  ProjectModule,
//    CategorieModule,
  //  CompanieModule,
  //  QuoteModule,

  SideBarRightModule,
  SideBarLeftModule,
  NavbarModule,


  ],
  exports: [
    UserModule,
    MatSidenavModule
   ],
  providers: [
    AuthGuardService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService,
    ErrorService,
//    CompanieService,
    //CategorieService,
    HomeService,
  //  PressService,
    // FormService,
    AdminService,
  //  UserService,
  //  CategorieService,
  //  PromotionService,
    AdminGuardService,
    CompanieGuardService,
    // PaiementGuardService,
    GlobalEventsManager,
    // TRANSLATION_PROVIDERS,
    // TranslateService,
  //  ProfileService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    {provide: ToastOptions, useClass: CustomOption},
  ],
  entryComponents: [
  //  CompanieAddUserDialog,
    // DeleteDialog,

  //  PromotionDeleteDialog,
    // EditOptionsComponentDialog,
    // CategorieDeleteDialog,
    // CategorieWhereDialogComponent,

  ],


  bootstrap: [AppComponent],
//  bootstrap: [AppComponent, EditOptionsComponentDialog],
})
export class AppModule {}
