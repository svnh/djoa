import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {LogService} from '../../log.service';
// import {ProductService} from '../../product/product.service';
// import { ProjectService} from '../../project/project.service';

import {Log} from '../../log.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder} from '@angular/forms';
// import { UserService} from '../../user/user.service';
// import { QuoteService } from '../../quote/quote.service';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../../user/user.model';
import { Mission } from '../../../mission/mission.model';
import { Strat } from '../../../strat/strat.model';
// // import { Quote } from '../../quote/quote.model';
// import { Product } from '../../product/product.model';
import { Project } from '../../../project/project.model';
// import { Project } from '../../project/project.model';
import {Search} from '../../../home/home.model'





@Component({
  selector: 'app-logsSearch',
  templateUrl: './search.component.html',
  styleUrls: ['../../log.component.css'],
})
export class SearchComponent implements OnInit {

  @Input() search: Search = new Search()
  @Output() getResultAutocomplete: EventEmitter<any> = new EventEmitter();

  searchUsers: User[] = [];
  searchMissions: Mission[] = [];
  searchStrats: Strat[] = [];
  searchProjects: Project[] = [];


  constructor(
    private logService: LogService,
    // private quoteService: QuoteService,
    // private projectService: ProjectService,
    // private userService: UserService,
    // private productService: ProductService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    // public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {

  }

  refreshSearch() {
    this.searchMissions.forEach(el => { this.search.missionId = el._id })
    this.searchUsers.forEach(el => { this.search.userId = el._id })
    this.searchStrats.forEach(el => { this.search.stratId = el._id })
    this.searchProjects.forEach(el => { this.search.projectId = el._id })

    this.getResultAutocomplete.emit(this.search)
  }





}
