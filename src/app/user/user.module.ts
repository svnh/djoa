import { NgModule } from '@angular/core';

import { ReactiveFormsModule} from '@angular/forms';

import { UserRouting } from './userRouting.module';

import { RightModule} from '../right/right.module';

import {MatSelectModule} from '@angular/material';
import { CompanieModule} from '../companie/companie.module';
import { ProjectModule} from '../project/project.module';


import { RegisterComponent} from './register/register.component';

import { NewUserComponent} from './single/elem/newUser.component';
import { NewUserFirstConnectionComponent} from './single/elem/newUserFirstConnection.component';
import { SettingsUserComponent } from './single/elem/settingsUser.component';
import { ProfileComponent} from './single/profile.component';

import { ChangePasswordComponent } from './single/changePassword/changePassword.component';
import { ResetPasswordComponent} from './accountRecover/resetPassword.component';
import { ForgetPasswordComponent} from './accountRecover/forgetPassword.component';

import { UserService} from './user.service';
// import { QuoteModule} from '../quote/quote.module';
// import { EditUserComponent} from './singleUser/editUser.component';
// import { PaiementService} from './paiement/paiement.service';
import { LoginComponent} from './login/login.component';


//import { UserFormsComponent} from '../form/userForms.component';

import { AdminUsersComponent } from './users/adminUsers.component';
import { AddUsersToObjectsComponent } from './addUsersToObjects/addUsersToObjects.component';

// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import {SharedModule } from '../shared/shared.module';
import {MatRadioModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material';

@NgModule({
  imports:      [

    UserRouting,
    // CommonModule,
    // FormsModule,

    ReactiveFormsModule,
    // QuoteModule,
    ProjectModule,
    RightModule,
    CompanieModule,
    SharedModule,
    RightModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
  ],
  declarations: [
//    UserDeleteDialog,
//    UserWhereDialogComponent,

    // AutocompleteComponent,
    NewUserComponent,
    NewUserFirstConnectionComponent,
    SettingsUserComponent,
    // EditUserComponent,
    ProfileComponent,
    // UserDialogComponent,
    // SingleUserComponent,
    // AddNoteComponent,
    // ChooseDateComponent,
    // UserPicturesComponent,


    AdminUsersComponent,
    AddUsersToObjectsComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,

    // UserProfileComponent,
    // PaiementComponent,
    // UserProfilePicturesComponent,
    // UserProfileSettingsComponent,
    ChangePasswordComponent,

    RegisterComponent,
    // PaiementPipe,


  ],
  exports:      [
    NewUserComponent,
    // SettingsUser,
    // EditUserComponent,
    ProfileComponent,
    AddUsersToObjectsComponent,
    // AutocompleteComponent
    // UsersComponent
   ],
  providers:    [
    // ProfileService,

    UserService,
    // PaiementService,
  ],
  entryComponents: [
    // UserDialogComponent
  //  UserDeleteDialog,
//    UserWhereDialogComponent,
  ]
})
export class UserModule { }
