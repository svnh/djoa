import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DocumentService} from '../document.service';
import { ToastsManager} from 'ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Document, StatusDocument} from '../document.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService} from '../../user/user.service';
import { User } from '../../user/user.model';
import { Project } from '../../project/project.model';
import { Categorie } from '../../categorie/categorie.model';
import { AuthService} from '../../auth/auth.service';
import { Search } from '../../shared/shared.model';
import { GlobalEventsManager} from '../../globalEventsManager';
import { ShowNavBarData} from '../../shared/shared.model';

// import { MatDialog } from '@angular/material';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
// import { QuoteService} from '../../quote/quote.service';
// import { Quote } from '../../quote/quote.model';


@Component({
  selector: 'app-document',
  templateUrl: './documentSingle.component.html',
  styleUrls: ['../document.component.css'],

})

export class DocumentSingleComponent implements OnInit {

  @Input() showBackButton: Boolean = true;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @Input() search: Search = new Search();


  // status = StatusDocument
  // categ: string = 'Electricité';
  // subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  // fetchedUsers: User[] = [];
  // fetchedQuotes: Quote[] = [];

  autocompleteSearchProjects: Project[] = [];
  autocompleteSearchCategories: Categorie[] = [];
  fetchedDocument: Document = new Document();


  public myForm: FormGroup;

  constructor(
    // private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private userService: UserService,
    // private quoteService: QuoteService,
    private authService: AuthService,
    private globalEventsManager: GlobalEventsManager,
  ) {
  }



  ngOnChanges() {
    if (this.search.documentId) {
      this.getDocument(this.search.documentId)
    }
    // this.search = new Search()
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      status: [''],
      link: [''],
      start: [''],
      end: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
    });

    //
    // this.fetchedDocument.dateDocument.startString = this.authService.isoDateToHtmlDate(this.fetchedDocument.dateDocument.start)
    // this.fetchedDocument.dateDocument.endString = this.authService.isoDateToHtmlDate(this.fetchedDocument.dateDocument.end)



    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(this.search)

      // if (this.search.documentId) {
      //   this.getDocument(this.search.documentId)
      // } else if (params['id']) {
      //     this.getDocument(params['id'])
      // }

    })

  }

  getResultSearchProjects(project: Project) {
    this.search.projectId = project._id
  }
  getResultSearchCategories(categorie: Categorie) {
    this.search.categorieId = categorie._id
  }
  clearSearchProjects() {
    this.search.projectId = ''
  }
  clearSearchCategories() {
    this.search.categorieId = ''
  }

  save() {
    if (!this.fetchedDocument.crewMembers.length && !this.fetchedDocument.briefs.length) {
      this.toastr.error('Error!', 'Crew Member is required');
      return;
    }
    if (!this.fetchedDocument.reviewers.length && !this.fetchedDocument.briefs.length) {
      this.toastr.error('Error!', 'Reviewer is required');
      return;
    }

    if(this.fetchedDocument._id) {
      this.documentService.updateDocument(this.fetchedDocument)
        .subscribe(
          res => {

            this.toastr.success('Great!', res.message)
            this.globalEventsManager.refreshCenter(true);
            this.closeRight()
            // this.fetchedDocument = res.obj
            // this.getDocument(res.obj._id)
            // this.saved.emit(res.obj)
            // this.router.navigate(['document/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    } else {
      this.documentService.saveDocument(this.fetchedDocument)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.globalEventsManager.refreshCenter(true);
            this.closeRight()
            // this.fetchedDocument = res.obj
            // this.getDocument(res.obj._id)
            // this.saved.emit(res.obj)
            // this.router.navigate(['document/' + res.obj._id]);
          },
          error => {
            this.toastr.error('Error!', error.message)
            console.log(error)
          }
        );
    }
  }

  closeRight() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = -1
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }

  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedDocument._id).then(function(){
  //         // this2.router.navigate(['user']);
  //         // this2.goBack();
  //       })
  //
  //     }
  //   })
  // }


  //
  // refreshHardCategories(){
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard2[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.fetchedDocument.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard2[indexHard].selected = true
  //       }
  //     })
  //   })
  //
  //   this.categoriesHard1.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard1[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard1.forEach((HardCategorie, indexHard) => {
  //     this.fetchedDocument.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard1[indexHard].selected = true
  //       }
  //     })
  //   })
  // }




  getDocument(id : string) {
    this.documentService.getDocument(id)
      .subscribe(
        res => {
          this.fetchedDocument = <Document>res

        },
        error => {
          console.log(error);
        }
      )
  }

  openDeleteConfirmation() {
      let newShowNavBarData = new ShowNavBarData()
      newShowNavBarData.search.typeScreen = 'deleteConfirmation'
      newShowNavBarData.search.typeObj = 'document'
      newShowNavBarData.search.documentId = this.fetchedDocument._id
      this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }

}
