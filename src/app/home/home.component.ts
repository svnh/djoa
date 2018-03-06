import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService} from './home.service';
import { FormGroup } from '@angular/forms';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Search } from '../shared/shared.model'
import { AuthService} from '../auth/auth.service';
import { User} from '../user/user.model';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ShowNavBarData} from '../shared/shared.model';
import { GlobalEventsManager} from '../globalEventsManager';
// import { EditOptionsComponentDialog }  from '../form/modalLibrary/modalLibrary.component';
// import { AdminService} from '../admin/services/admin.service';
// import { SideBarRightComponent} from '../nav/sideBarRight/sideBarRight.component';
// import { SideBarLeftComponent} from '../nav/sideBarLeft/sideBarLeft.component';
// import { Options } from './options.model';
// import { Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @ViewChild(SideBarRightComponent) private sideBarRightComponent: SideBarRightComponent;
  // @ViewChild(SideBarLeftComponent) private sideBarLeftComponent: SideBarLeftComponent;
  // fetchedUser: User = new User();
  search: Search = new Search(


  )
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
    // private adminService: AdminService,
    private homeService: HomeService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,

    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.type === 'emailPreferences') {
        this.openProfile();

      }
    });
  }

  openProfile() {
    const showNavBarData = new ShowNavBarData()
    showNavBarData.search.typeScreen = 'profile'
    showNavBarData.search.typeObj = 'user'
    showNavBarData.search.section = 'settings'
    showNavBarData.showNavBar = 1
    showNavBarData.search.userId = this.authService.getCurrentUser()._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }

  // sideNavRightOpen(typeObj: string, id: string) {
  //   if(typeObj === 'user') this.search.userId = id;
  //   if(typeObj === 'project') this.search.projectId = id;
  //
  //   this.search.typeObj = typeObj;
  //
  //   // this.sideBarRightComponent.sidenavOpen(this.search)
  //   // sidenav.open()
  // }

  // sideNavLeftOpen(typeObj: string) {
  //
  //   // this.sideBarLeftComponent.sidenavOpen(this.search)
  //   // sidenav.open()
  // }

  //
  // goTo(path: string) {
  //
  //     this.router.navigate([path]);
  //
  //
  //
  //   // if( (this.isAdmin() || this.isManager()) && path === 'user') {
  //   //   if(this.companies.length)
  //   //     this.router.navigate(['/companie/' + this.companies[0]._id + '/users']);
  //   // } else {
  //   //   this.router.navigate([path]);
  //   // }
  // }
  // showObjHTML(nameObject) {
  //   return true;
  //   // return this.authService.showObjHTML(nameObject)
  // }
  //
  //
  // isAdmin() {
  //   return this.authService.isAdmin();
  // }


}
