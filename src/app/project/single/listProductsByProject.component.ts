import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ProjectService} from '../project.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project, StatusProject, Log} from '../project.model';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { UserService} from '../../user/user.service';
import { QuoteService} from '../../quote/quote.service';

import { User } from '../../user/user.model';
import { Product } from '../../product/product.model';
import {ProductService} from '../../product/product.service';

import { AuthService} from '../../auth/auth.service';
import {Search} from '../../mainPageHome/mainPageHome.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../mainPageHome/mainPageHome.model'



@Component({
  selector: 'app-listProductsByProject',
  templateUrl: './listProductsByProject.component.html',
  styleUrls: ['../project.component.css'],

})

export class ListProductsByProjectComponent implements OnInit {

  // @Input() showBackButton: Boolean = true;
  // @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();

  searchMissionStrat: Search = new Search();
  searchMissionContent: Search = new Search();
  searchMissionResearch: Search = new Search();

  fetchedProducts: Product[] = []
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


  // public myForm: FormGroup;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    // private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    // public dialog: MdDialog,
    private router: Router,
    private location: Location,
    // private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private productService: ProductService,
    // private quoteService: QuoteService,
    private authService: AuthService,
  ) {
    // this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
    //     if(isRefresh)
    //       this.getProject(this.fetchedProject._id)
    // })
  }





  ngOnInit() {

    this.getProducts(1, {})
    // this.myForm = this._fb.group({
    //   status: [''],
    //   name: ['', [Validators.required, Validators.minLength(2)]],
    //   description: [''],
    // });

    //
    // this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
    // this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)

    if(this.search.projectId)
      this.getProject(this.search.projectId)

    //
    // this.activatedRoute.params.subscribe((params: Params) => {
    //
    // })

  }


  getProducts(page: number, search: any) {

    this.productService.getProducts(page, search)
      .subscribe(
        res => {

          this.fetchedProducts = res.data

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





  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          // let categName0 = ''
          // let categName1 = ''
          // let categName2 = ''
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
