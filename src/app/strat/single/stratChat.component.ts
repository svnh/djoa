import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { StratService } from '../strat.service';
import { CategorieService } from '../../categorie/categorie.service';
import { ProjectService } from '../../project/project.service';
import { Strat } from '../strat.model';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';
import { Categorie } from '../../categorie/categorie.model';
import { Project } from '../../project/project.model';
import { Search } from '../../shared/shared.model';
import { GlobalEventsManager } from '../../globalEventsManager';
import { ShowNavBarData } from '../../shared/shared.model';
// import { QuoteService } from '../../quote/quote.service';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
// import { Quote } from '../../quote/quote.model';

@Component({
  selector: 'app-stratChat',
  templateUrl: './stratChat.component.html',
  styleUrls: ['../strat.component.css'],
})
export class StratChatComponent implements OnInit {
  @Output() newStratSaved: EventEmitter<any> = new EventEmitter();

  @Input() fetchedStrat: Strat = new Strat()
  @Input() search: Search = new Search()
  fetchedStrats: Strat[] = [];
  loading: boolean;
  myForm: FormGroup;
  buttonDataStrat: ButtonDataStrat = new ButtonDataStrat()

  // ]
  constructor(
    private stratService: StratService,
    // private quoteService: QuoteService,
    private globalEventsManager: GlobalEventsManager,

    // private projectService: ProjectService,
    // private userService: UserService,
    // private categorieService: CategorieService,
    //    private modalService: NgbModal,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
      if (isRefresh) {
        this.getStrat(this.fetchedStrat._id)
        this.globalEventsManager.refreshCenter(false);
      }
    })
  }

  goBack() {
    this.location.back();
  }
  ngOnInit() {
    this.myForm = this._fb.group({
      description: [''],
      title: [''],
      status: [''],
      startString: [''],
      endString: [''],
    })


    this.fetchedStrat.dateStrat.startString = this.authService.isoDateToHtmlDate(this.fetchedStrat.dateStrat.start)
    this.fetchedStrat.dateStrat.endString = this.authService.isoDateToHtmlDate(this.fetchedStrat.dateStrat.end)



    // this.fetchedStrat
    // .datePaiementString =
    // this.authService
    // .isoDateToHtmlDate(this.fetchedStrat.datePaiement)
    // if (this.search.stratType)
    //   this.fetchedStrat.stratType = this.search.stratType
    //

    // if (this.search.projectId) {
    //   let newProject = new Project()
    //   newProject._id = this.search.projectId
    //   this.fetchedStrat.projects.push(newProject)
    //
    // }

    this.activatedRoute.params.subscribe((params: Params) => {
      // if (this.search.stratId) {
      //   this.getStrat(this.search.stratId)
      // } else
      if (params['id']) {
        this.search.stratId = params['id']
        this.getStrat(params['id'])
      }
    })
  }


  openDetails() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.search.typeObj = 'strat'
    showNavBarData.search.stratId = this.fetchedStrat._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }

  openProfile(userId: string) {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.search.typeScreen = 'profile'
    showNavBarData.search.typeObj = 'user'
    showNavBarData.search.userId = userId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  openTeam() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.search.typeScreen = 'team'
    showNavBarData.search.typeObj = 'strat'
    showNavBarData.search.stratId = this.fetchedStrat._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }

  save() {

    this.fetchedStrat.dateStrat
      .start = this.authService
        .HTMLDatetoIsoDate(this.fetchedStrat.dateStrat.startString)

    this.fetchedStrat.dateStrat
      .end = this.authService
        .HTMLDatetoIsoDate(this.fetchedStrat.dateStrat.endString)


    // this.fetchedStrat.datePaiement = this.authService.HTMLDatetoIsoDate(this.fetchedStrat.datePaiementString)
    if (this.fetchedStrat._id) {
      this.stratService.updateStrat(this.fetchedStrat)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          this.getStrat(res.obj._id)
          // this.fetchedStrat = res.obj
          //this.router.navigate(['strat/edit/' + this.fetchedStrat._id])
        },
        error => {
          this.toastr.error('error!', error)
        }
        )
    } else {
      this.stratService.saveStrat(this.fetchedStrat)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          this.getStrat(res.obj._id)
          this.globalEventsManager.refreshCenter(true);
          // this.fetchedStrat = res.obj
          // this.newStratSaved.emit()
          // if(this.showHeader)
          //   this.router.navigate(['strat/edit/' + res.obj._id])
        },
        error => { console.log(error) }
        )
    }

  }




  //
  // onDelete(id: string) {
  //   let this2 = this
  //   return new Promise(function(resolve, reject) {
  //     this2.stratService.deleteStrat(id)
  //       .subscribe(
  //       res => {
  //         this2.toastr.success('Great!', res.message);
  //         resolve(res)
  //       },
  //       error => {
  //         console.log(error);
  //         reject(error)
  //       }
  //       )
  //   })
  // }


  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedStrat._id).then(function(){
  //         this2.router.navigate(['strat']);
  //       })
  //
  //     }
  //   })
  // }



  getStratsButtons(page: number, search: any) {
    this.loading = true;
    this.stratService.getStrats(page, search)
      .subscribe(
      res => {
        this.fetchedStrats = res.data
        let positionObj: number = this.fetchedStrats.findIndex(strat => strat._id === this.fetchedStrat._id)
        let countStrats = this.fetchedStrats.length
        if (positionObj === 0) {
          this.buttonDataStrat.left = new Strat()
        } else {
          this.buttonDataStrat.left = this.fetchedStrats[positionObj - 1]
        }
        if (positionObj === countStrats - 1) {
          this.buttonDataStrat.right = new Strat()
        } else {
          this.buttonDataStrat.right = this.fetchedStrats[positionObj + 1]
        }
        this.loading = false;
      },
      error => {
        console.log(error);
      }
      );
  }
  goTo(typeObj: string, id: string) {
    this.router.navigate([typeObj + '/' + id]);
  }

  getStrat(id: string) {
    this.stratService.getStrat(id)
      .subscribe(
      res => {
        this.fetchedStrat = res


        this.fetchedStrat.dateStrat.startString = this.authService
          .isoDateToHtmlDate(this.fetchedStrat.dateStrat.start)

        this.fetchedStrat.dateStrat.endString = this.authService
          .isoDateToHtmlDate(this.fetchedStrat.dateStrat.end)


        this.fetchedStrat.dateStrat.percentageProgress = this.authService.getPourcentageProgress(this.fetchedStrat.dateStrat.start, this.fetchedStrat.dateStrat.end)
        let newSearch = new Search()

        this.fetchedStrat.projects.forEach(project => { newSearch.projectId = project._id })
        this.fetchedStrat.categories.forEach(categorie => { newSearch.categorieId = categorie._id })

        // this.getStratsButtons(1, newSearch)

      },
      error => { console.log(error) }
      )
  }


  // ngOnDestroy() {
  //   console.log('destroy')
  //   // prevent memory leak when component destroyed
  //   // this.subscription.unsubscribe();
  // }

}
