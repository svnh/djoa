import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ProjectService} from '../project.service';
import { ToastsManager} from 'ng2-toastr';
// import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project} from '../project.model';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { UserService} from '../../user/user.service';
import { DocumentService} from '../../document/document.service';

import { User } from '../../user/user.model';
import { Categorie } from '../../categorie/categorie.model';
import { Mission } from '../../mission/mission.model';
import {CategorieService} from '../../categorie/categorie.service';

import { AuthService} from '../../auth/auth.service';
import {Search} from '../../home/home.model';
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../home/home.model';



@Component({
  selector: 'app-projectContent',
  templateUrl: './projectContent.component.html',
  styleUrls: ['../project.component.css'],

})

export class ProjectContentComponent implements OnInit {

  // @Input() showBackButton: Boolean = true;
  // @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();

  // searchMissionStrat: Search = new Search();
  // searchMissionContent: Search = new Search();
  // searchMissionResearch: Search = new Search();
  // fetchedMissions: Mission[] = []
  fetchedCategories: Categorie[] = []
  // fetchedDocumentsInProject: Document[] = []
  activityPendingTasks: number = 0
  myActivityPendingTasks: number = 0
  activityMissions: number = 0
  myActivityMissions: number = 0
  //
  // status = StatusProject
  // categ: string = 'Electricité';
  // subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  // fetchedUsers: User[] = [];
  // fetchedQuotes: Quote[] = [];
  // showNavBarData: ShowNavBarData = new ShowNavBarData()

  fetchedProject: Project = new Project();


  public myForm: FormGroup;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    // private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    // // public dialog: MdDialog,
    // private router: Router,
    // private location: Location,
    private activatedRoute: ActivatedRoute,
    // private _fb: FormBuilder,
    private categorieService: CategorieService,
    private documentService: DocumentService,
    private authService: AuthService,
  ) {
    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
        if(isRefresh)
          this.getProject(this.fetchedProject._id)
    })
  }



  ngOnInit() {

    this.getCategories(1, {})


    this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
    this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)


    this.activatedRoute.params.subscribe((params: Params) => {
      // this.fetchedMissions = []
      this.activityMissions = 0
      this.activityPendingTasks = 0
      this.myActivityMissions = 0
      this.myActivityPendingTasks = 0



      if(params['id']) {
        this.search.projectId = params['id']
        this.getProject(this.search.projectId)
        this.getDocumentsInMissionsByProject(this.search.projectId)
        this.getDocumentsInStratsByProject(this.search.projectId)
        // this.getMissionsByCategoriesByProject(params['id'])


      }

    })

  }

  getResultMissions(missions) {
    missions.forEach(mission => {
      this.activityMissions++

      if(mission.users.some(user => user._id === this.authService.getCurrentUser()._id))
        this.myActivityMissions++


    })
  }
  getCategories(page: number, search: any) {

    this.categorieService.getCategories(page, search)
      .subscribe(
        res => {
          this.fetchedCategories = res.data
        },
        error => {
          console.log(error);
        }
      );
  }


  openDetails() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = true
    showNavBarData.search.typeObj = 'project'
    showNavBarData.search.projectId = this.fetchedProject._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  openTeam() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = true
    showNavBarData.search.typeScreen = 'team'
    showNavBarData.search.typeObj = 'project'
    showNavBarData.search.projectId = this.fetchedProject._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }



  // openProfile(userId: string){
  //   let showNavBarData = new ShowNavBarData()
  //   showNavBarData.search.typeScreen = 'profile'
  //   showNavBarData.search.typeObj = 'user'
  //   showNavBarData.search.userId = userId
  //   this.globalEventsManager.showNavBarRight(showNavBarData);
  // }


  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          this.fetchedProject = <Project>res

          this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
          this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)

          this.fetchedProject.dateProject.percentageProgress = this.authService.getPourcentageProgress(this.fetchedProject.dateProject.start, this.fetchedProject.dateProject.end)

        },
        error => {
          console.log(error);
        }
      )
  }


  // getMissionsByCategoriesByProject(id: string) {
  //   this.projectService.getMissionsByCategoriesByProject(id)
  //     .subscribe(
  //       res => {
  //         console.log(res)
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     )
  // }
  getDocumentsInMissionsByProject(projectId: string) {
    this.documentService.getDocumentsInMissionsByProject(projectId)
      .subscribe(
        res => {
          console.log(res)
          res.forEach(document => {
            console.log(document)
            // this.fetchedDocumentsInProject.push(document)
            if (document.status.global !== 'COMPLETE') {
              this.activityPendingTasks++
              // console.log(document)
              if(document.currentUserBelongsTo === document.status.pendingActionFrom )
                this.myActivityPendingTasks++
              // if (document.crewMembers.some(user => user._id === this.authService.getCurrentUser()._id)) {
              //   // if( document.status.global === 'REVIEW' && )
              // }
            }
          })
        },
        error => {
          console.log(error);
        }
      )
  }
  getDocumentsInStratsByProject(projectId: string) {
    this.documentService.getDocumentsInStratsByProject(projectId)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error);
        }
      )
  }



  // onDelete(id: string) {
  //   let this2 = this
  //   return new Promise(function(resolve, reject) {
  //     this2.projectService.deleteProject(id)
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
