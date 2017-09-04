import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DocumentService} from '../document.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Document, StatusDocument} from '../document.model';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { UserService} from '../../user/user.service';
// import { QuoteService} from '../../quote/quote.service';

import { User } from '../../user/user.model';
// import { Quote } from '../../quote/quote.model';
import { AuthService} from '../../auth/auth.service';

import {Search} from '../../mainPageHome/mainPageHome.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../mainPageHome/mainPageHome.model'


@Component({
  selector: 'app-document',
  templateUrl: './documentSingle.component.html',
  styleUrls: ['../document.component.css'],

})

export class DocumentSingleComponent implements OnInit {

  @Input() showBackButton: Boolean = true;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @Input() search: Search = new Search()


  // status = StatusDocument
  // categ: string = 'Electricité';
  // subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  fetchedUsers: User[] = [];
  // fetchedQuotes: Quote[] = [];


  fetchedDocument: Document = new Document();


  public myForm: FormGroup;

  constructor(
    private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
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




    if(this.search.documentId)
      this.getDocument(this.search.documentId)
    this.activatedRoute.params.subscribe((params: Params) => {

      if (this.search.documentId) {
        this.getDocument(this.search.documentId)
      } else if(params['id']) {
          this.getDocument(params['id'])
      }

    //   if(params['id']) {
    //     this.search.documentId = params['id']
    //     this.getDocument(params['id'])
    //   } else {
    //     if(params['idClient'])
    //        this.getUser(params['idClient'])
    //     if(params['selectedIndex'])
    //       this.selectedIndex0 = params['selectedIndex']
    //
    //       this.getItemSteps()
    //   }
    })

  }
  //
  // getItemSteps() {
  //   let currentUser = this.authService.getCurrentUser()
  //
  //   currentUser.ownerCompanies.forEach((companie, index) => {
  //
  //     if(this.selectedIndex0 >= companie.categories.categDocument.length)
  //       this.selectedIndex0 = -1
  //
  //
  //     // console.log(JSON.parse(currentUser.companies[index].categJson.categDocument))
  //     if(currentUser.ownerCompanies[index].categories.categDocument)
  //       this.itemSteps = currentUser.ownerCompanies[index].categories.categDocument
  //   })
  // }





  addCalendar() {
    let queryParams = {}
    // queryParams['new'] = true
    queryParams['showCreateEvent'] = true
    queryParams['showSearchEvent'] = false


    // if(this.fetchedDocument.assignedTos.length) {queryParams['idUserNew'] = this.fetchedDocument.assignedTos[0]._id}
    if(this.fetchedDocument._id) {queryParams['idDocumentNew'] = this.fetchedDocument._id}
    if(this.fetchedDocument.clients.length) {queryParams['idClientNew'] = this.fetchedDocument.clients[0]._id }
    // if(this.fetchedDocument.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedDocument.assignedTos[0]._id }
    if(this.fetchedDocument._id) {queryParams['idDocumentSearch'] = this.fetchedDocument._id}

    this.router.navigate(['userCalendar/', queryParams])
  }
  seeCalendar() {
    let queryParams = {}
    // queryParams['showCreateEvent'] = true
    queryParams['showSearchEvent'] = false

    // if(this.fetchedDocument.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedDocument.assignedTos[0]._id }
    if(this.fetchedDocument._id) {queryParams['idDocumentSearch'] = this.fetchedDocument._id}
    // if(this.fetchedDocument.clients.length)      {queryParams['idClientSearch'] = this.fetchedDocument.clients[0]._id}
    this.router.navigate(['userCalendar/', queryParams])
  }
  //
  // newComment(comment: string) {
  //   // let newLog = new Log()
  //   // newLog.comment = comment
  //   // this.fetchedDocument.logs.push(newLog)
  // }
  // getUser(id: string) {
  //   this.userService.getUser(id)
  //     .subscribe(
  //       res => {
  //         //this.fetchedUsers[0] = res.user
  //         this.selectUser(res)
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }
  //
  // changeCascade(selectedIndex0, selectedIndex1, selectedIndex2) {
  //   this.selectedIndex0 = selectedIndex0
  //   this.selectedIndex1 = selectedIndex1
  //   this.selectedIndex2 = selectedIndex2
  // }
  // addQuote(){
  // }


  // // autocomplete user
  // selectUser(user: User) {
  //   // this.autocompleteUser=''
  //   // this.fetchedUsers = []
  //   this.fetchedDocument.clients = [user]
  // }
  // searchUsers() {
  //   if(!this.autocompleteUser) {
  //      this.fetchedUsers = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteUser,
  //       };
  //     this.getUsers(1, search)
  //   }
  // }
  // getUsers(page: number, search: any) {
  //   this.userService.getUsers(page, search)
  //     .subscribe(
  //       res => {
  //         this.fetchedUsers = res.data
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }


  // removePic(i) {
  //   // this.fetchedDocument.forms.splice(i, 1);
  // }



    // autocomplete AssignedTo
    // autocompleteAssignedTo: string = '';
    // fetchedAssignedTos: User[] = [];
    // selectAssignedTo(user: User) {
    //   // this.autocompleteAssignedTo=''
    //   // this.fetchedAssignedTos = []
    //   // this.fetchedDocument.assignedTos = [user]
    // }




  //
  // goBack() {
  //   this.location.back();
  // }


  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     console.log(result)
  //   //     // this.fetchedDocument.forms.push( result)
  //   //   }
  //   // })
  // }


  save() {

    // this.fetchedDocument.dateDocument.start = this.authService.HTMLDatetoIsoDate(this.fetchedDocument.dateDocument.startString)
    // this.fetchedDocument.dateDocument.end = this.authService.HTMLDatetoIsoDate(this.fetchedDocument.dateDocument.endString)
    //
    // let categName0 = ''
    // let categName1 = ''
    // let categName2 = ''
    //
    // if(this.selectedIndex0>=0) {categName0 = this.itemSteps[this.selectedIndex0].categ}
    // if(this.selectedIndex1>=0) {categName1 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].categ}
    // if(this.selectedIndex2>=0) {categName2 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg[this.selectedIndex2].categ}
    //
    //
    // this.fetchedDocument.categorie.categ0 = [{name: categName0}]
    // this.fetchedDocument.categorie.categ1 = [{name: categName1}]
    // this.fetchedDocument.categorie.categ2 = [{name: categName2}]
    //


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
    showNavBarData.showNavBar = false
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
          let categName0 = ''
          let categName1 = ''
          let categName2 = ''
          this.fetchedDocument = <Document>res
          // // console.log(this.fetchedDocument.categorie)
          // if(this.fetchedDocument.categorie.categ0.length)
          //   categName0 = this.fetchedDocument.categorie.categ0[0].name
          // if(this.fetchedDocument.categorie.categ1.length)
          //   categName1 = this.fetchedDocument.categorie.categ1[0].name
          // if(this.fetchedDocument.categorie.categ2.length)
          //   categName2 = this.fetchedDocument.categorie.categ2[0].name
          //
          // this.itemSteps.forEach((categ0, index) => {
          //   if(categ0.categ === categName0)
          //     this.selectedIndex0 = index
          // })
          //
          // if(this.selectedIndex0 >= 0)
          // this.itemSteps[this.selectedIndex0].subCateg.forEach((categ1,index) => {
          //   if(categ1.categ === categName1)
          //     this.selectedIndex1 = index
          // })
          // if(this.selectedIndex1 >= 0)
          // this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg.forEach((categ2,index) => {
          //   if(categ2.categ === categName2)
          //     this.selectedIndex2 = index
          // })


          // this.fetchedDocument.dateDocument.startString = this.authService.isoDateToHtmlDate(this.fetchedDocument.dateDocument.start)
          // this.fetchedDocument.dateDocument.endString = this.authService.isoDateToHtmlDate(this.fetchedDocument.dateDocument.end)



        },
        error => {
          console.log(error);
        }
      )
  }


  // onDelete(id: string) {
  //   let this2 = this
  //   return new Promise(function(resolve, reject) {
  //     this2.documentService.deleteDocument(id)
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
