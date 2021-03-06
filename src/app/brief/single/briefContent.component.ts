import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BriefService} from '../brief.service';
import { ToastsManager} from 'ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Brief, StatusBrief, Log} from '../brief.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService} from '../../user/user.service';
import { User } from '../../user/user.model';
import { AuthService} from '../../auth/auth.service';
import { Search } from '../../shared/shared.model';
import {ShowNavBarData} from '../../shared/shared.model';
import {GlobalEventsManager} from '../../globalEventsManager';
// import { MatDialog } from '@angular/material';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
// import { QuoteService} from '../../quote/quote.service';
// import { Quote } from '../../quote/quote.model';



@Component({
  selector: 'app-briefContent',
  templateUrl: './briefContent.component.html',
  styleUrls: ['../brief.component.css'],
})

export class BriefContentComponent implements OnInit {

  @Input() showBackButton: Boolean = true;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();

  fetchedUsers: User[] = [];
  fetchedBrief: Brief = new Brief();

  constructor(
    private sanitizer: DomSanitizer,
    private globalEventsManager: GlobalEventsManager,
    private briefService: BriefService,
    private toastr: ToastsManager,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private userService: UserService,
    // public dialog: MatDialog,
    // private quoteService: QuoteService,
    private authService: AuthService,
  ) {
    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
        if(isRefresh) {
          this.globalEventsManager.refreshCenter(false);
          this.getBrief(this.fetchedBrief._id)
        }
    })
  }





  ngOnInit() {


    this.fetchedBrief.dateBrief.startString = this.authService.isoDateToHtmlDate(this.fetchedBrief.dateBrief.start)
    this.fetchedBrief.dateBrief.endString = this.authService.isoDateToHtmlDate(this.fetchedBrief.dateBrief.end)




    // if(this.search.briefId)
    //   this.getBrief(this.search.briefId)
    this.activatedRoute.params.subscribe((params: Params) => {

      // if (this.search.briefId) {
      //   this.getBrief(this.search.briefId)
      // } else
      if(params['id']) {
          this.search.briefId = params['id']
          this.getBrief(params['id'])
          this.search.briefId = params['id']
      }

    //   if(params['id']) {
    //     this.search.briefId = params['id']
    //     this.getBrief(params['id'])
    //   } else {
    //     if(params['idClient'])
    //        this.getUser(params['idClient'])
    //     if(params['selectedIndex'])
    //       this.selectedIndex0 = params['selectedIndex']
    //
    //       this.getItemSteps()
    //   }
    })
  }

  openDetails(briefId: string) {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeScreen = 'object'
    showNavBarData.search.typeObj = 'brief'
    showNavBarData.search.briefId = briefId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  delete(briefId: string) {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeScreen = 'deleteConfirmation'
    showNavBarData.search.typeObj = 'brief'
    showNavBarData.search.briefId = briefId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }




  save() {

    this.fetchedBrief.dateBrief.start = this.authService.HTMLDatetoIsoDate(this.fetchedBrief.dateBrief.startString)
    this.fetchedBrief.dateBrief.end = this.authService.HTMLDatetoIsoDate(this.fetchedBrief.dateBrief.endString)


    if(this.fetchedBrief._id) {
      this.briefService.updateBrief(this.fetchedBrief)
        .subscribe(
          res => {

            this.toastr.success('Great!', res.message)

            // this.fetchedBrief = res.obj
            // this.getBrief(res.obj._id)
            // this.saved.emit(res.obj)
            // this.router.navigate(['brief/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    } else {
      this.briefService.saveBrief(this.fetchedBrief)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)

            // this.fetchedBrief = res.obj
            // this.getBrief(res.obj._id)
            // this.saved.emit(res.obj)
            // this.router.navigate(['brief/' + res.obj._id]);
          },
          error => {
            this.toastr.error('Error!', error.message)
            console.log(error)
          }
        );
    }
  }





  getBrief(id: string) {
    this.briefService.getBrief(id)
      .subscribe(
        res => {
          this.fetchedBrief = <Brief>res
          // this.fetchedBrief.strats.forEach(strat => {
          //   strat.projects.forEach(projectId => {
          //     this.search.projectId = projectId._id
          //   })
          // })


          this.fetchedBrief.dateBrief.startString = this.authService.isoDateToHtmlDate(this.fetchedBrief.dateBrief.start)
          this.fetchedBrief.dateBrief.endString = this.authService.isoDateToHtmlDate(this.fetchedBrief.dateBrief.end)



        },
        error => {
          console.log(error);
        }
      )
  }
  goToStrat() {
    this.fetchedBrief.strats.forEach(strat => {
      this.router.navigate(['strat/' + strat._id]);
    })
  }

  // onDelete(id: string) {
  //   let this2 = this
  //   return new Promise(function(resolve, reject) {
  //     this2.briefService.deleteBrief(id)
  //       .subscribe(
  //         res => {
  //           this2.toastr.success('Great!', res.message);
  //           resolve(res)
  //         },
  //         error => {
  //           console.log(error);
  //           reject(error)
  //         }
  //       )
  //     })
  // }


}
