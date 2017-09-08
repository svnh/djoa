import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { DocumentService} from '../document.service';
import { Document} from '../document.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';
import {ShowNavBarData} from '../../home/home.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {Search} from '../../home/home.model'


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['../document.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DocumentsComponent implements OnInit {
  @Input() userId = '';
  @Input() showHeader = true;
  @Input() search: Search = new Search()


  // token: string = localStorage.getItem('id_token');
  fetchedDocuments: Document[] = [];
  // search: any = {
  //   categories : [],
  //   search: ''
  // };
  loading: boolean;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categories2 = '';
  isCrew: boolean = true
  showNavBarData: any = new ShowNavBarData()

  constructor(
    // private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private toastr: ToastsManager,
    private globalEventsManager: GlobalEventsManager,
    // // public dialog: MdDialog,
    // private router: Router,
    // private location: Location,
    // private authService: AuthService,
    // private userService: UserService,

  ) {

    this.globalEventsManager.showNavBarEmitterRight.subscribe((showNavBarData)=>{
        if (showNavBarData !== null) {
          this.showNavBarData = showNavBarData;
          // if(this.showNavBarData.showNavBar) {
          //   this.sidenav.open()
          // } else {
          //   this.sidenav.close()
          // }
        }
    })


    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
        if(isRefresh)
          this.getDocuments(1, this.search)
    })
  }

  ngOnInit() {
    let this2 = this
    // setTimeout(function(){
    //   this2.search.userId = this2.userId
    //   this2.search.orderBy = 'name'
      this2.getDocuments(1, this2.search)
    // }, 200);
  }
  // changeCrew(result) {
  //   result.checked ? this.isCrew = true : this.isCrew = false
  // }
  changeStatus(result, i, newStatus) {

    this.fetchedDocuments[i].status.global = newStatus

    if(newStatus === 'CHANGES SENT') {
      this.fetchedDocuments[i].status.changeRequest = false
      // this.fetchedDocuments[i].status.review = false
      // this.fetchedDocuments[i].status.approve = false
      // this.fetchedDocuments[i].status.changeSent = false
    }
    if(newStatus === 'CHANGES REQUEST' && this.isCrew == false) {
      this.fetchedDocuments[i].status.changeSent = false
    }

    this.save(this.fetchedDocuments[i])

    // result.checked ? this.fetchedDocuments[i].status.global = 'WIP' : this.fetchedDocuments[i].status.global  = ''
  }





    save(document) {

        this.documentService.updateDocument(document)
          .subscribe(
            res => {

              this.toastr.success('Great!', res.message)

            },
            error => {console.log(error)}
          );

    }



  addDocument() {
    console.log(this.showNavBarData.showNavBar)
    if(!this.showNavBarData.showNavBar) {
      let showNavBarData = new ShowNavBarData()
      showNavBarData.showNavBar = true
      showNavBarData.search.typeScreen = 'object'
      showNavBarData.search.typeObj = 'document'
      showNavBarData.search.stratId = this.search.stratId
      showNavBarData.search.missionId = this.search.missionId
      this.globalEventsManager.showNavBarRight(showNavBarData);
    } else {
      let showNavBarData = new ShowNavBarData()
      showNavBarData.showNavBar = false
      this.globalEventsManager.showNavBarRight(showNavBarData)
    }

  }
  closeDocument() {


    // console.log()
  }
  openDetails(documentId: string) {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = true
    showNavBarData.search.typeScreen = 'object'
    showNavBarData.search.typeObj = 'document'
    showNavBarData.search.documentId = documentId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  delete(documentId: string) {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = true
    showNavBarData.search.typeScreen = 'deleteConfirmation'
    showNavBarData.search.typeObj = 'document'
    showNavBarData.search.documentId = documentId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }


  // goBack() {
  //   this.location.back();
  // }

  // searchDocuments() {
  //   this.getDocuments(1, this.search)
  // }
  //
  // onDelete(id: string) {
  //   this.documentService.deleteDocument(id)
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
    this.getDocuments(page, this.search);
  }


  // loadMore(){
  //   this.paginationData.currentPage = this.paginationData.currentPage+1
  //   this.getDocuments(this.paginationData.currentPage, this.search)
  // }

  getDocuments(page : number, search: any) {
    //this.fetchedDocuments =[]
    this.loading = true;
    this.documentService.getDocuments(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedDocuments = res.data

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
