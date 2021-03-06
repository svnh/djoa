import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ResetPasswordComponent} from './accountRecover/resetPassword.component';
import {ForgetPasswordComponent} from './accountRecover/forgetPassword.component';
//import {UserFormsComponent} from '../form/userForms.component';
import {AuthGuardService} from '../auth/authguard.service';
// import {AppComponent} from '../app.component';
// import {UserProfileComponent} from './singleUser/userProfile.component';
//import {UserProfilePicturesComponent} from './singleUser/userProfilePictures.component';
//import {UserProfileSettingsComponent} from './singleUser/userProfileSettings.component';

import {ChangePasswordComponent} from './single/changePassword/changePassword.component';
// import { PaiementComponent } from './paiement/paiement.component';
//import {SingleUserComponent} from './singleUser/singleUser.component';
//import {AddNoteComponent} from './singleUser/addNote.component';
//import {ChooseDateComponent} from './singleUser/chooseDate.component';
//import {UserPicturesComponent} from './singleUser/userPictures.component';
// import {AddCategoriesToUserComponent} from './singleUser/addCategoriesToUser.component';
// import { UserCategoriesHistory} from './singleUser/userCategoriesHistory.component';
import { NewUserFirstConnectionComponent} from './single/elem/newUserFirstConnection.component';
import { AdminUsersComponent } from './users/adminUsers.component';


export const routes: Routes = [


  // {path: ':id', component: NewUserComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset', component: ForgetPasswordComponent},
  {path: 'reset/:token', component: ResetPasswordComponent},
  //{path: 'forms', component: UserFormsComponent, canActivate: [AuthGuardService]},
  {path: 'profile/password', component: ChangePasswordComponent, canActivate: [AuthGuardService]},
  // {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
  // {path: 'paiement', component: PaiementComponent, canActivate: [AuthGuardService]},
  // {path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuardService]},
  // {path: ':id', component: NewUserComponent, canActivate: [AuthGuardService]},
  {path: ':id', component: NewUserFirstConnectionComponent, canActivate: [AuthGuardService]},
  {path: 'list/:isExternalUser', component: AdminUsersComponent, canActivate: [AuthGuardService]},

//  {path: 'profile/:id/userProfileSettings', component: UserProfileSettingsComponent, canActivate: [AuthGuardService]},
  // {path: 'profile/:id/userProfilePictures', component: UserProfilePicturesComponent, canActivate: [AuthGuardService]},
  // {path: ':id', component: SingleUserComponent},
  // {path: ':id/addnote', component: AddNoteComponent},
  // {path: ':id/choosedate', component: ChooseDateComponent},
  // {path: ':id/userPictures', component: UserPicturesComponent},
  // {path: ':id/addCategoriesToUser', component: AddCategoriesToUserComponent},
  // {path: ':id/categoriesHistory', component: UserCategoriesHistory},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting {}
