import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { CompanieDetailComponent} from './single/companieDetail.component';
import { MainPageHomeComponent} from './mainPageHome.component';
// import { EditAddUserToCompanieComponent} from './addUser/editAddUserToCompanie.component';
import { AdminGuardService} from '../admin/services/adminGuard';
// import { CompanieDetailUsersComponent} from './companieDetailUsers.component';



export const routes: Routes = [
  {path: '', component: MainPageHomeComponent},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageHomeRouting {}
