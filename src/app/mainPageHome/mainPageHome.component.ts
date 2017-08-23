import { Component, OnInit, ViewChild } from '@angular/core';
import { MainPageHomeService} from './mainPageHome.service';
import { FormGroup } from '@angular/forms';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
// import { EditOptionsComponentDialog }  from '../form/modalLibrary/modalLibrary.component';
import { AdminService} from '../admin/services/admin.service';
import { SideBarRightComponent} from '../nav/sideBarRight/sideBarRight.component';

import {Search} from './mainPageHome.model'
// import { Options } from './options.model';
import { Router} from '@angular/router';
import { AuthService} from '../auth/auth.service';
import { User} from '../user/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './mainPageHome.component.html',
  styleUrls: ['./mainPageHome.component.css']
})
export class MainPageHomeComponent implements OnInit {
  @ViewChild(SideBarRightComponent) private sideBarObjComponent: SideBarRightComponent;
  fetchedUser: User = new User();
  search: Search = new Search(


  )
  constructor(

    private router:Router,
    private adminService: AdminService,
    private mainPageHomeService: MainPageHomeService,
    private toastr: ToastsManager,
    public dialog: MdDialog,

    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.fetchedUser = this.authService.getCurrentUser()
  }
  sideNavOpen(typeObj: string, id: string) {
    if(typeObj === 'user') this.search.userId = id;
    if(typeObj === 'project') this.search.projectId = id;

    this.search.typeObj = typeObj;

    this.sideBarObjComponent.sidenavOpen(this.search)
    // sidenav.open()
  }
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
