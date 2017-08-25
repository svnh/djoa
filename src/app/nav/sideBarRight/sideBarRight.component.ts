import {Component, OnInit, ViewChild} from '@angular/core';
// import {AuthService} from '../../auth/auth.service';
import { GlobalEventsManager} from '../../globalEventsManager';
import {MdSidenav} from '@angular/material';
import {ShowNavBarData} from '../../mainPageHome/mainPageHome.model'


@Component({
  selector: 'app-sideBarRight',
  templateUrl: './sideBarRight.component.html',
  styleUrls: ['./sideBarRight.component.css']
})
export class SideBarRightComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MdSidenav;

  showNavBarData: ShowNavBarData = new ShowNavBarData()

  constructor(
    private globalEventsManager: GlobalEventsManager,
  ) {
    // console.log(this.showNavBarData)
    this.globalEventsManager.showNavBarEmitterRight.subscribe((showNavBarData)=>{
        if (showNavBarData !== null) {
          this.showNavBarData = showNavBarData;
          if(this.showNavBarData.showNavBar) {
            this.sidenav.open()
          } else {
            this.sidenav.close()
          }
        }
    })
  }


  ngOnInit() {}

  sideNavAction(side: string, showNavBar: boolean, typeObj: string) {
    this.showNavBarData.showNavBar = showNavBar
    this.showNavBarData.search.typeObj = typeObj
    this.globalEventsManager.showNavBarRight(this.showNavBarData);
  }


}
