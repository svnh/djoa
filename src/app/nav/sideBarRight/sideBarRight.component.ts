import {Component, OnInit, ViewChild} from '@angular/core';
// import {AuthService} from '../../auth/auth.service';
import { GlobalEventsManager} from '../../globalEventsManager';
import {MdSidenav} from '@angular/material';

@Component({
  selector: 'app-sideBarRight',
  templateUrl: './sideBarRight.component.html',
  styleUrls: ['./sideBarRight.component.css']
})
export class SideBarRightComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MdSidenav;

  search = {
    typeObj:'',
    userId: '',
  }
  constructor(
    private globalEventsManager: GlobalEventsManager,
  ) {}



  ngOnInit() {

  }

  sidenavOpen(search) {
    this.search = search
    this.sidenav.toggle()
  }


}
