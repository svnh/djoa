import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { MissionService} from '../mission.service';
import { Mission} from '../mission.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['../mission.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class MissionsComponent implements OnInit {
  @Input() userId = '';
  @Input() productType = '';
  token: string = localStorage.getItem('id_token');
  fetchedMissions: Mission[] = [];
  search: any = {
    categories : [],
    search: ''
  };
  loading: boolean;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categories2 = '';



  constructor(
    private sanitizer: DomSanitizer,
    private missionService: MissionService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,

  ) {
  }


  goBack() {
    this.location.back();
  }

  searchMissions() {
    this.getMissions(1, this.search)
  }

  onDelete(id: string) {
    this.missionService.deleteMission(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {
    this.getMissions(page, this.search);
  }


  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getMissions(this.paginationData.currentPage, this.search)
  }


  getMissions(page: number, search: any) {
    this.loading = true;
    this.missionService.getMissions(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedMissions = res.data

          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    let this2 = this
    setTimeout(function(){
      this2.search.userId = this2.userId
      this2.search.orderBy = 'name'
      this2.getMissions(1, this2.search)
    }, 200);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}