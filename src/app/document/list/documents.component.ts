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

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['../document.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DocumentsComponent implements OnInit {
  @Input() userId = '';
  @Input() showHeader = true;
  // token: string = localStorage.getItem('id_token');
  fetchedDocuments: Document[] = [];
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
    // private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private toastr: ToastsManager,
    // public dialog: MdDialog,
    // private router: Router,
    // private location: Location,
    // private authService: AuthService,
    // private userService: UserService,

  ) {
  }

  ngOnInit() {
    let this2 = this
    setTimeout(function(){
      this2.search.userId = this2.userId
      this2.search.orderBy = 'name'
      this2.getDocuments(1, this2.search)
    }, 200);
  }
  // goBack() {
  //   this.location.back();
  // }

  searchDocuments() {
    this.getDocuments(1, this.search)
  }

  onDelete(id: string) {
    this.documentService.deleteDocument(id)
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
    this.getDocuments(page, this.search);
  }


  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getDocuments(this.paginationData.currentPage, this.search)
  }


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
