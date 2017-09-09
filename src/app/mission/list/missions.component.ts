import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { MissionService} from '../mission.service';
import { Mission} from '../mission.model';
import { ToastsManager} from 'ng2-toastr';
// import { MdDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';
import {ShowNavBarData} from '../../home/home.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {Search, PaginationData} from '../../home/home.model'
import {Product} from '../../product/product.model';


@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['../mission.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class MissionsComponent implements OnInit {
  @Input() userId = '';
  @Input() product: Product = new Product();
  @Input() search: Search = new Search()
  @Output() getResultMissions: EventEmitter<any> = new EventEmitter();

  // token: string = localStorage.getItem('id_token');
  fetchedMissions: Mission[] = [];
  // search: any = {
  //   categories : [],
  //   search: ''
  // };
  loading: boolean;

  paginationData: PaginationData = new PaginationData()



  constructor(
    private globalEventsManager: GlobalEventsManager,
    private sanitizer: DomSanitizer,
    private missionService: MissionService,
    private toastr: ToastsManager,
    // public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
        if(isRefresh)
          this.getMissions(1, this.search)
    })
  }

  ngOnChanges(changes) {
    this.getMissions(1, this.search)
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      // this.getMissions(1, this.search)
    })

    // let this2 = this
    // setTimeout(function(){
    //   this2.search.userId = this2.userId
    //   this2.search.orderBy = 'name'
    //   this2.getMissions(1, this2.search)
    // }, 200);
  }

  goTo(missionId: string) {
    this.openProductsSideBar(missionId)
    this.router.navigate(['mission/' + missionId]);
  }

  // ngOnChanges(changes: any){
  //   console.log('test')
  //
  // }
  // test() {
  //   r77')
  // }

  // searchMissions() {
  //   this.getMissions(1, this.search)
  // }

  // onDelete(id: string) {
  //   this.missionService.deleteMission(id)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message);
  //         console.log(res);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  getPage(page: number) {
    this.getMissions(page, this.search);
  }


  // loadMore(){
  //   this.paginationData.currentPage = this.paginationData.currentPage+1
  //   this.getMissions(this.paginationData.currentPage, this.search)
  // }
  openProductsSideBar(missionId: string) {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'product'
    newShowNavBarData.search.missionId = missionId
    newShowNavBarData.search.projectId = this.search.projectId
    this.globalEventsManager.showNavBarLeft(newShowNavBarData)
  }
  createNewMission() {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'mission'
    newShowNavBarData.search.projectId = this.search.projectId
    newShowNavBarData.search.productId = this.search.productId
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }
  openDeleteMission(missionId: string) {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeScreen = 'deleteConfirmation'
    newShowNavBarData.search.typeObj = 'mission'
    newShowNavBarData.search.missionId = missionId
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }

  getMissions(page: number, search: any) {
    this.loading = true;
    this.missionService.getMissions(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedMissions = res.data
          this.fetchedMissions.forEach((mission, i) => {
              this.fetchedMissions[i].dateMission.percentageProgress = this.authService.getPourcentageProgress(mission.dateMission.start, mission.dateMission.end)
          });

          this.getResultMissions.emit(this.fetchedMissions)


          // let durationProject = +new Date(this.fetchedProject.dateProject.end) - +new Date(this.fetchedProject.dateProject.start)
          // let timeSpent = +new Date() - +new Date(this.fetchedProject.dateProject.start)
          // this.fetchedProject.dateProject.percentageProgress = Math.round((timeSpent / durationProject) * 100)
          //
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }



  // isAdmin() {
  //   return this.authService.isAdmin();
  // }
}
