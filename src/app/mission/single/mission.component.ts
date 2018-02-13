import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {MissionService} from '../mission.service';
import {CategorieService} from '../../categorie/categorie.service';
import { ProjectService} from '../../project/project.service';
import {Mission} from '../mission.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService} from '../../user/user.service';
// import { QuoteService } from '../../quote/quote.service';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
// import { Quote } from '../../quote/quote.model';
import { Categorie } from '../../categorie/categorie.model';
import { Project } from '../../project/project.model';


import { Search } from '../../shared/shared.model'
import { GlobalEventsManager} from '../../globalEventsManager';
import { ShowNavBarData} from '../../shared/shared.model';


@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['../mission.component.css'],
})
export class MissionComponent implements OnInit {
  @Output() newMissionSaved: EventEmitter<any> = new EventEmitter();

  @Input() fetchedMission: Mission = new Mission()
  @Input() search: Search = new Search()

  fetchedCategories: Categorie[] = [];
  loading = false;
  myForm: FormGroup;

// ]
  constructor(
    private missionService: MissionService,
    private globalEventsManager: GlobalEventsManager,
    private categorieService: CategorieService,
    private toastr: ToastsManager,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
    // private quoteService: QuoteService,
    // private projectService: ProjectService,
    // private projectService: ProjectService,
    // private userService: UserService,
    //    private modalService: NgbModal,
    // public dialog: MatDialog,
  ) {}

  ngOnInit() {
    // this.getCategories(1, {});
    this.myForm = this._fb.group({
      description: [''],
      title: [''],
      status: [''],
      startString: [''],
      endString: [''],
    })


    this.fetchedMission.dateMission.startString = this.authService.isoDateToHtmlDate(this.fetchedMission.dateMission.start)
    this.fetchedMission.dateMission.endString = this.authService.isoDateToHtmlDate(this.fetchedMission.dateMission.end)



    // this.fetchedMission
    // .datePaiementString =
    // this.authService
    // .isoDateToHtmlDate(this.fetchedMission.datePaiement)
    // if (this.search.missionType)
    //   this.fetchedMission.missionType = this.search.missionType


    // if (this.search.projectId)
    //   this.getProject(this.search.projectId)
    //
    // if (this.search.categorieId)
    //   this.getCategorie(this.search.categorieId)


    this.activatedRoute.params.subscribe((params: Params) => {
      if (this.search.missionId) {
        this.getMission(this.search.missionId)
      } else if(params['id']) {
        this.getMission(params['id'])
      }
    })
  }


  // getCategories(page: number, search: any) {
  //   this.loading = true;
  //   this.categorieService.getCategories(page, search)
  //     .subscribe(
  //       res => {
  //         this.fetchedCategories = res.data
  //         if (this.fetchedCategories.length && !this.fetchedMission.categories.length) {
  //           this.fetchedMission.categories.push(this.fetchedCategories[0])
  //         }
  //         this.loading = false;
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  // getProject(id: string) {
  //   this.projectService.getProject(id)
  //     .subscribe(
  //       res => { this.fetchedMission.projects.push(<Project>res) },
  //       error => { console.log(error) }
  //     )
  // }
  // getCategorie(id: string) {
  //   this.categorieService.getCategorie(id)
  //     .subscribe(
  //       res => { this.fetchedMission.categories.push(<Categorie>res) },
  //       error => { console.log(error) }
  //     )
  // }



  // selectAssignedTo(event) {
  //   this.fetchedMission.users = [event]
  // }


  save() {

      this.fetchedMission.dateMission
      .start = this.authService
      .HTMLDatetoIsoDate(this.fetchedMission.dateMission.startString)

      this.fetchedMission.dateMission
      .end = this.authService
      .HTMLDatetoIsoDate(this.fetchedMission.dateMission.endString)


    // this.fetchedMission.datePaiement = this.authService.HTMLDatetoIsoDate(this.fetchedMission.datePaiementString)
    if(this.fetchedMission._id) {
      this.missionService.updateMission(this.fetchedMission)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            // this.getMission(res.obj._id)
            this.globalEventsManager.refreshCenter(true);
            this.closeRight()

            // this.fetchedMission = res.obj
            //this.router.navigate(['mission/edit/' + this.fetchedMission._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.missionService.saveMission(this.fetchedMission)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.globalEventsManager.refreshCenter(true);
            this.closeRight()
            // this.getMission(res.obj._id)
            // this.globalEventsManager.refreshCenter(true);
            // this.fetchedMission = res.obj
            // this.newMissionSaved.emit()
            // if(this.showHeader)
            //   this.router.navigate(['mission/edit/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }

  }


  closeRight() {
    const showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = -1
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }


  openDeleteConfirmation() {
      let newShowNavBarData = new ShowNavBarData()
      newShowNavBarData.search.typeScreen = 'deleteConfirmation'
      newShowNavBarData.search.typeObj = 'mission'
      newShowNavBarData.search.missionId = this.fetchedMission._id
      this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }




  // onDelete(id: string) {
  //   let this2 = this
  //   return new Promise(function(resolve, reject) {
  //     this2.missionService.deleteMission(id)
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


  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedMission._id).then(function(){
  //         this2.router.navigate(['mission']);
  //       })
  //
  //     }
  //   })
  // }




  getMission(id: string) {
    this.missionService.getMission(id)
      .subscribe(
        res => {
          this.fetchedMission = res


          this.fetchedMission.dateMission
            .startString = this.authService
              .isoDateToHtmlDate(this.fetchedMission.dateMission.start)

          this.fetchedMission.dateMission
            .endString = this.authService
              .isoDateToHtmlDate(this.fetchedMission.dateMission.end)



          // this.fetchedMission
          // .datePaiementString =
          // this.authService
          // .isoDateToHtmlDate(this.fetchedMission.datePaiement)
        },
        error => {
          console.log(error);
        }
      )
  }



}
