import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ShowNavBarData } from '../../shared/shared.model'
import { GlobalEventsManager } from '../../globalEventsManager';
import { Search, PaginationData } from '../../shared/shared.model';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['../document.component.css'],
  // encapsulation: ViewEncapsulation.None

})
export class DocumentsComponent implements OnInit {
  @Input() userId = '';
  editMode: boolean = false;
  @Input() search: Search = new Search()


  // token: string = localStorage.getItem('id_token');
  fetchedDocuments: Document[] = [];
  // search: any = {
  //   categories : [],
  //   search: ''
  // };
  loading: boolean;

  paginationData: PaginationData = new PaginationData();


  categories2 = '';

  // showNavBarData: any

  constructor(
    // private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private toastr: ToastsManager,
    private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,

  ) {

    // this.globalEventsManager.showNavBarEmitterRight.subscribe((showNavBarData) => {
    //   if (showNavBarData !== null) {
    //     this.showNavBarData = showNavBarData;
    //   }
    // })


    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
      if (isRefresh) {
        this.getDocuments(1, this.search)
        this.globalEventsManager.refreshCenter(false);
        this.editMode = false
      }
    })
  }

  openLink(document) {
    document.forms.forEach(singleForm => {
      window.open('/uploads/forms/' + singleForm.owner + '/' + singleForm.imagePath , '_blank');
    });


    if (document.link) {
      console.log(document.link)
      if (document.link.substring(0, 7) !== 'http://' && document.link.substring(0, 8) !== 'https://') {
        document.link = 'http://' + document.link;
      }
      // console.log(link)
      window.open(document.link, '_blank');

    }
  }
  ngOnChanges() {
    this.getDocuments(1, this.search)
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getDocuments(1, this.search)
    })
  }

  changeStatus(result, i, newStatus, pendingActionFrom: string) {
    console.log(pendingActionFrom)
    this.fetchedDocuments[i].status.global = newStatus
    this.fetchedDocuments[i].status.pendingActionFrom = pendingActionFrom

    if (newStatus === 'CHANGES SENT') {
      this.fetchedDocuments[i].status.changeRequest = false

    }
    if (newStatus === 'CHANGES REQUEST' && this.fetchedDocuments[i].currentUserBelongsTo === 'client') {
      this.fetchedDocuments[i].status.changeSent = false
    }

    this.save(this.fetchedDocuments[i])

  }

  save(document) {

    this.documentService.updateDocument(document)
      .subscribe(
      res => {

        this.toastr.success('Great!', res.message)

      },
      error => { console.log(error) }
      );

  }


  addDocument() {
    let showNavBarData = new ShowNavBarData()
    // console.log(this.search)
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeScreen = 'object'
    showNavBarData.search.typeObj = 'document'
    showNavBarData.search.stratId = this.search.stratId
    showNavBarData.search.briefId = this.search.briefId
    showNavBarData.search.missionId = this.search.missionId
    showNavBarData.search.projectId = this.search.projectId
    showNavBarData.search.categorieId = this.search.categorieId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }

  openDetails(documentId: string) {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeScreen = 'object'
    showNavBarData.search.typeObj = 'document'
    showNavBarData.search.documentId = documentId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  delete(documentId: string) {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = 1
    showNavBarData.search.typeScreen = 'deleteConfirmation'
    showNavBarData.search.typeObj = 'document'
    showNavBarData.search.documentId = documentId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }

  getPage(page: number) {
    this.getDocuments(page, this.search);
  }

  getDocuments(page: number, search: any) {

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
  // check if the image is actually an image by checking the mime type
  isImage(file: File): boolean {
    if (
      file.type.match('image/*') ||

      file.type.match('application/pdf') ||

      file.type.match('application/msword') ||
      file.type.match('application/vnd.ms-word') ||
      file.type.match('application/vnd.ms-word.document.macroEnabled.12') ||
      file.type.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
      file.type.match('application/rtf') ||

      file.type.match('text/csv') ||
      file.type.match('application/vnd.ms-excel') ||
      file.type.match('application/vnd.ms-excel.sheet.macroEnabled.12') ||
      file.type.match('application/vnd.ms-excel.addin.macroEnabled.12') ||
      file.type.match('application/vnd.ms-excel.template.macroEnabled.12') ||
      file.type.match('application/vnd.ms-excel.sheet.binary.macroEnabled.12') ||
      file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
      file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.template') ||
      file.type.match('application/vnd.oasis.opendocument.spreadsheet') ||

      file.type.match('application/vnd.ms-powerpoint') ||
      file.type.match('application/vnd.ms-powerpoint.template.macroEnabled.12') ||
      file.type.match('application/vnd.ms-powerpoint.addin.macroEnabled.12') ||
      file.type.match('application/vnd.ms-powerpoint.presentation.macroEnabled.12') ||
      file.type.match('application/vnd.ms-powerpoint.slideshow.macroEnabled.12') ||
      file.type.match('application/vnd.openxmlformats-officedocument.presentationml.template') ||
      file.type.match('application/vnd.openxmlformats-officedocument.presentationml.presentation') ||
      file.type.match('application/vnd.openxmlformats-officedocument.presentationml.slideshow') ||

      file.type.match('application/x-adobe-indesign') ||
      file.type.match('application/illustrator') ||
      file.type.match('application/postscript') ||
      file.type.match('application/photoshop') ||
      file.type.match('image/x-psd') ||
      file.type.match('image/vnd.adobe.photoshop') ||

      file.type.match('application/zip') ||
      file.type.match('application/x-rar-compressed')
    ) {
      return true;
    }
    this.toastr.error('Format not allowed!');
    return false;
  }
  // isAdmin() {
  //   return this.authService.isAdmin();
  // }
}
