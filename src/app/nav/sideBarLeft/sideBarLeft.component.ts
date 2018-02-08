import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AdminService} from '../../admin/services/admin.service';
import {Router} from '@angular/router';
import { UserService} from '../../user/user.service';
import { User} from '../../user/user.model';
import { CompanieGuardService} from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
// import { ChangeDetectionStrategy} from '@angular/core';
import {GlobalEventsManager} from '../../globalEventsManager';
import {MatSidenav} from '@angular/material';
import {ShowNavBarData} from '../../shared/shared.model'


@Component({
  selector: 'app-sideBarLeft',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sideBarLeft.component.html',
  styleUrls: ['./sideBarLeft.component.css']
})
export class SideBarLeftComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  @Input() widthContainer: number;
  @Input() isDesktopScreen = false;
  showNavBarData: ShowNavBarData = new ShowNavBarData()
 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  fetchedUser: User = new User();

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private adminService: AdminService,
    private userService: UserService,
    private router: Router,
  ) {
    this.globalEventsManager.showNavBarEmitterLeft.subscribe((showNavBarData) => {
        if (showNavBarData !== null) {
          this.showNavBarData = showNavBarData;
          if(this.showNavBarData.showNavBar === 1) {
            this.sidenav.open()
          }
          if(this.showNavBarData.showNavBar === -1) {
            this.sidenav.close()
          }
        }
    })
  }


  closeLeft() {

    this.showNavBarData.showNavBar = -1;
    this.globalEventsManager.showNavBarLeft(this.showNavBarData);
  }

  // goToProject(projectId: string) {
  //   this.router.navigate(['project/' + projectId]);
  // }

  ngOnInit(){
    // console.log(this.widthContainer)
  }
  ngOnChanges() {
    if (this.authService.isLoggedIn()) {
      if(this.widthContainer) {
        // console.log(this.widthContainer)
        if(this.widthContainer > 991) {
          this.showNavBarData.showNavBar = 1
        }
        this.showNavBarData.search.typeObj = 'project'
        this.globalEventsManager.showNavBarLeft(this.showNavBarData);


        // this.globalEventsManager.showNavBar(true);
        // this.showNavBar = true;
        //let userId = localStorage.getItem('userId');

        this.fetchedUser = this.authService.getCurrentUser()

      }
    }
  }

  openSearch() {
    const newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.showNavBar = 1
    newShowNavBarData.search.typeScreen = 'search'
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }
}
