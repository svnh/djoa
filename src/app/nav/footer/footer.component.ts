import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

import {Router} from '@angular/router';
import {ShowNavBarData} from '../../shared/shared.model'
import {GlobalEventsManager} from '../../globalEventsManager';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() sidenav: any;

  // showNavBarData: ShowNavBarData = new ShowNavBarData()


  constructor(
    private authService: AuthService,
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
  ) {}


  ngOnInit() {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  openSearch() {
    const newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.showNavBar = 1
    newShowNavBarData.search.typeScreen = 'search'
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }

}
