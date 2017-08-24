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

  // search = {
  //   typeObj:'',
  //   userId: '',
  // }
  constructor(
    private globalEventsManager: GlobalEventsManager,
  ) {
    console.log(this.showNavBarData)
    this.globalEventsManager.showNavBarEmitter.subscribe((showNavBarData)=>{
        if (showNavBarData !== null) {
          console.log(showNavBarData)
          this.showNavBarData = showNavBarData;
          if(this.showNavBarData.rightSideBar.showNavBar) {
            this.sidenav.open()
          } else {
            this.sidenav.close()
          }
        }
    })
  }



  ngOnInit() {

  }

  // ngOnDestroy() {
  //   console.log('test')
  //   // prevent memory leak when component destroyed
  //   // this.subscription.unsubscribe();
  // }

  sideNavAction(side: string, showNavBar: boolean, typeObj: string) {
    this.showNavBarData[side].showNavBar = showNavBar
    this.showNavBarData[side].typeObj = typeObj
    this.globalEventsManager.showNavBar(this.showNavBarData);
  }


}
