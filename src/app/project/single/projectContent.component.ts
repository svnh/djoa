import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ProjectService} from '../project.service';
import { ToastsManager} from 'ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project} from '../project.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService} from '../../user/user.service';
import { DocumentService} from '../../document/document.service';
import { User } from '../../user/user.model';
import { Categorie } from '../../categorie/categorie.model';
import { Mission } from '../../mission/mission.model';
import {CategorieService} from '../../categorie/categorie.service';
import { AuthService} from '../../auth/auth.service';
import { Search } from '../../shared/shared.model';
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../shared/shared.model';
// import { MatDialog } from '@angular/material';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'



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
  activityPendingTasksInProject: number = 0
  myActivityPendingTasksInProject: number = 0
  activityMissionsInProject: number = 0
  myActivityMissionsInProject: number = 0
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
    // // public dialog: MatDialog,
    // private router: Router,
    // private location: Location,
    private activatedRoute: ActivatedRoute,
    // private _fb: FormBuilder,
    private categorieService: CategorieService,
    private documentService: DocumentService,
    private authService: AuthService,
  ) {
    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
        if(isRefresh) {
          this.getProject(this.fetchedProject._id)
          this.globalEventsManager.refreshCenter(false);

        }

    })
  }



  ngOnInit() {
    this.getCategories(1, {})


    this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
    this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)


    this.activatedRoute.params.subscribe((params: Params) => {
      // this.fetchedMissions = []
      this.activityMissionsInProject = 0
      this.activityPendingTasksInProject = 0
      this.myActivityMissionsInProject = 0
      this.myActivityPendingTasksInProject = 0



      if(params['id']) {
        this.search.projectId = params['id']
        this.getProject(this.search.projectId)
        this.getDocumentsByMissions(this.search)
        this.getDocumentsInStrats(this.search)
        // this.getMissionsByCategoriesByProject(params['id'])


      }

    })

  }

  getResultMissions(missions) {
    missions.forEach(mission => {
      // console.log(mission)
      this.activityMissionsInProject++

      if(mission.users.some(user => user._id === this.authService.getCurrentUser()._id))
        this.myActivityMissionsInProject++


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

  openPorfile(userId) {
    const showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeScreen = 'profile'
    showNavBarData.search.typeObj = 'user'
    showNavBarData.search.userId = userId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  openDetails() {
    const showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeObj = 'project'
    showNavBarData.search.projectId = this.fetchedProject._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  openTeam() {
    const showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeScreen = 'team'
    showNavBarData.search.typeObj = 'project'
    showNavBarData.search.projectId = this.fetchedProject._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  openNotif() {
    const showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeObj = 'notif'
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }





  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          this.fetchedProject = <Project>res

          const showNavBarData = new ShowNavBarData()
          // showNavBarData.showNavBar = 1
          showNavBarData.search.typeObj = 'project'
          showNavBarData.search.projectId = this.fetchedProject._id
          this.globalEventsManager.showNavBarLeft(showNavBarData);


          this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
          this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)

          this.fetchedProject.dateProject.percentageProgress = this.authService.getPourcentageProgress(this.fetchedProject.dateProject.start, this.fetchedProject.dateProject.end)

        },
        error => {
          console.log(error);
        }
      )
  }




  getDocumentsByMissions(search: Search) {
    this.documentService.getDocumentsByMissions(search)
      .subscribe(
        res => {
          // console.log(res)
          res.forEach(missionsDoc => {
            missionsDoc.documents.forEach(document => {
              this.activityPendingTasksInProject += document.activityPendingTasks
              this.myActivityPendingTasksInProject += document.myActivityPendingTasks
              // if (document.status.global !== 'COMPLETE') {
              //   this.activityPendingTasks++
              //   if(document.currentUserBelongsTo === document.status.pendingActionFrom )
              //     this.myActivityPendingTasks++
              // }
            })
          })
        },
        error => { console.log(error) }
      )
  }
  getDocumentsInStrats(search: Search) {
    this.documentService.getDocumentsInStrats(search)
      .subscribe(
        res => {
          res.forEach(document => {
            this.activityPendingTasksInProject += document.activityPendingTasks
            this.myActivityPendingTasksInProject += document.myActivityPendingTasks
            // if (document.status.global !== 'COMPLETE') {
            //   this.activityPendingTasks++
            //   if(document.currentUserBelongsTo === document.status.pendingActionFrom )
            //     this.myActivityPendingTasks++
            // }
          })
        },
        error => { console.log(error) }
      )
  }




}
