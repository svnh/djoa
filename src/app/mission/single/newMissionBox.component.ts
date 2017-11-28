import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
// import {AuthService} from '../../auth/auth.service';
// import {MissionService} from '../mission.service';
// import {CategorieService} from '../../categorie/categorie.service';
// import { ProjectService} from '../../project/project.service';

import {Mission} from '../mission.model';

import {ToastsManager} from 'ng2-toastr';

// import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
// import { FormBuilder, FormGroup} from '@angular/forms';
// import { UserService} from '../../user/user.service';
// import { QuoteService } from '../../quote/quote.service';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
// import { User } from '../../user/user.model';
// import { Quote } from '../../quote/quote.model';
// import { Categorie } from '../../categorie/categorie.model';
// import { Project } from '../../project/project.model';
import { Search } from '../../shared/shared.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../shared/shared.model'

@Component({
  selector: 'app-newMissionBox',
  templateUrl: './newMissionBox.component.html',
  styleUrls: ['../mission.component.css'],
})
export class NewMissionBox implements OnInit {

  @Input() search: Search = new Search()

// ]
  constructor(
    // private missionService: MissionService,
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
    // private _fb: FormBuilder,
    // private authService: AuthService,
  ) {}

  ngOnInit() {
  }

  createNewMission() {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'mission'
    newShowNavBarData.search.projectId = this.search.projectId
    newShowNavBarData.search.categorieId = this.search.categorieId
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }



}
