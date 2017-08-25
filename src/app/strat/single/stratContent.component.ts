import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { StratService} from '../strat.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Strat, StatusStrat, Log} from '../strat.model';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { UserService} from '../../user/user.service';
import { QuoteService} from '../../quote/quote.service';

import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { AuthService} from '../../auth/auth.service';
import {Search} from '../../mainPageHome/mainPageHome.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../mainPageHome/mainPageHome.model'



@Component({
  selector: 'app-stratContent',
  templateUrl: './stratContent.component.html',
  styleUrls: ['../strat.component.css'],

})

export class StratContentComponent implements OnInit {

  @Input() showBackButton: Boolean = true;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @Input() search: Search = new Search()

  // selectedIndex0: number = -1
  // selectedIndex1: number = -1
  // selectedIndex2: number = -1
  // // show1 = false
  // // show2 = false
  // // categ0: string = '';
  // // categ1: string = '';
  // // categ2: string = '';
  //
  // itemSteps:any =[];


  status = StatusStrat
  categ: string = 'Electricité';
  subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  fetchedUsers: User[] = [];
  fetchedQuotes: Quote[] = [];
  showNavBarData: ShowNavBarData = new ShowNavBarData()

  fetchedStrat: Strat = new Strat();


  public myForm: FormGroup;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private sanitizer: DomSanitizer,
    private stratService: StratService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private userService: UserService,
    private quoteService: QuoteService,
    private authService: AuthService,
  ) {
    this.globalEventsManager.showNavBarEmitterRight.subscribe((mode)=>{
        // mode will be null the first time it is created, so you need to igonore it when null
        if (mode !== null) {
          this.showNavBarData = mode;
          // this.fetchedUser = this.authService.getCurrentUser()
        }
    });
  }





  ngOnInit() {
    this.myForm = this._fb.group({
      status: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
    });


    this.fetchedStrat.dateStrat.startString = this.authService.isoDateToHtmlDate(this.fetchedStrat.dateStrat.start)
    this.fetchedStrat.dateStrat.endString = this.authService.isoDateToHtmlDate(this.fetchedStrat.dateStrat.end)


    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        // this.search.stratId = params['id']
        this.getStrat(params['id'])
      }
      // else {
      //   // if(params['idClient'])
      //   //    this.getUser(params['idClient'])
      //   if(params['selectedIndex'])
      //     this.selectedIndex0 = params['selectedIndex']
      //
      //     this.getItemSteps()
      // }
    })

  }

  // openSideBarLeft(){
  //   let newShowNavBarData = new ShowNavBarData()
  //   newShowNavBarData.showNavBar = true
  //   newShowNavBarData.search.typeObj = ''
  //   this.globalEventsManager.showNavBarLeft(newShowNavBarData);
  // }

  // sideNavAction(side: string, showNavBar: boolean, typeObj: string) {
  //   // this.showNavBarData = new ShowNavBarData()
  //   this.showNavBarData.showNavBar = showNavBar
  //   this.showNavBarData.search.typeObj = typeObj
  //   this.globalEventsManager.showNavBarRight(this.showNavBarData);
  // }
  // openMyProfile() {
  //   this.showNavBarData = new ShowNavBarData()
  //   this.showNavBarData.showNavBar = true
  //   this.showNavBarData.search.typeObj = 'user'
  //   this.showNavBarData.search.userId = this.authService.getCurrentUser()._id
  //   this.globalEventsManager.showNavBarRight(this.showNavBarData);
  // }

  opendetailsStrat() {
    this.showNavBarData = new ShowNavBarData()
    this.showNavBarData.showNavBar = true
    this.showNavBarData.search.typeObj = 'strat'
    this.showNavBarData.search.stratId = this.fetchedStrat._id
    this.globalEventsManager.showNavBarRight(this.showNavBarData);
  }


  // getItemSteps() {
  //   let currentUser = this.authService.getCurrentUser()
  //
  //   currentUser.ownerCompanies.forEach((companie, index) => {
  //
  //     if(this.selectedIndex0 >= companie.categories.categStrat.length)
  //       this.selectedIndex0 = -1
  //
  //
  //     // console.log(JSON.parse(currentUser.companies[index].categJson.categStrat))
  //     if(currentUser.ownerCompanies[index].categories.categStrat)
  //       this.itemSteps = currentUser.ownerCompanies[index].categories.categStrat
  //   })
  // }




  //
  // addCalendar() {
  //   let queryParams = {}
  //   // queryParams['new'] = true
  //   queryParams['showCreateEvent'] = true
  //   queryParams['showSearchEvent'] = false
  //
  //
  //   // if(this.fetchedStrat.assignedTos.length) {queryParams['idUserNew'] = this.fetchedStrat.assignedTos[0]._id}
  //   if(this.fetchedStrat._id) {queryParams['idStratNew'] = this.fetchedStrat._id}
  //   if(this.fetchedStrat.clients.length) {queryParams['idClientNew'] = this.fetchedStrat.clients[0]._id }
  //   // if(this.fetchedStrat.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedStrat.assignedTos[0]._id }
  //   if(this.fetchedStrat._id) {queryParams['idStratSearch'] = this.fetchedStrat._id}
  //
  //   this.router.navigate(['userCalendar/', queryParams])
  // }
  // seeCalendar() {
  //   let queryParams = {}
  //   // queryParams['showCreateEvent'] = true
  //   queryParams['showSearchEvent'] = false
  //
  //   // if(this.fetchedStrat.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedStrat.assignedTos[0]._id }
  //   if(this.fetchedStrat._id) {queryParams['idStratSearch'] = this.fetchedStrat._id}
  //   // if(this.fetchedStrat.clients.length)      {queryParams['idClientSearch'] = this.fetchedStrat.clients[0]._id}
  //   this.router.navigate(['userCalendar/', queryParams])
  // }
  //
  // newComment(comment: string) {
  //   // let newLog = new Log()
  //   // newLog.comment = comment
  //   // this.fetchedStrat.logs.push(newLog)
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
  //   this.fetchedStrat.clients = [user]
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

  //
  // removePic(i) {
  //   // this.fetchedStrat.forms.splice(i, 1);
  // }



    // autocomplete AssignedTo
    // autocompleteAssignedTo: string = '';
    // fetchedAssignedTos: User[] = [];
    selectAssignedTo(user: User) {
      // this.autocompleteAssignedTo=''
      // this.fetchedAssignedTos = []
      // this.fetchedStrat.assignedTos = [user]
    }




  //
  // goBack() {
  //   this.location.back();
  // }

  //
  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     console.log(result)
  //   //     // this.fetchedStrat.forms.push( result)
  //   //   }
  //   // })
  // }
  //
  //
  // save() {
  //
  //   this.fetchedStrat.dateStrat.start = this.authService.HTMLDatetoIsoDate(this.fetchedStrat.dateStrat.startString)
  //   this.fetchedStrat.dateStrat.end = this.authService.HTMLDatetoIsoDate(this.fetchedStrat.dateStrat.endString)
  //
  //   // let categName0 = ''
  //   // let categName1 = ''
  //   // let categName2 = ''
  //   //
  //   // if(this.selectedIndex0>=0) {categName0 = this.itemSteps[this.selectedIndex0].categ}
  //   // if(this.selectedIndex1>=0) {categName1 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].categ}
  //   // if(this.selectedIndex2>=0) {categName2 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg[this.selectedIndex2].categ}
  //   //
  //   //
  //   // this.fetchedStrat.categorie.categ0 = [{name: categName0}]
  //   // this.fetchedStrat.categorie.categ1 = [{name: categName1}]
  //   // this.fetchedStrat.categorie.categ2 = [{name: categName2}]
  //
  //
  //
  //   if(this.fetchedStrat._id) {
  //     this.stratService.updateStrat(this.fetchedStrat)
  //       .subscribe(
  //         res => {
  //
  //           this.toastr.success('Great!', res.message)
  //           // this.fetchedStrat = res.obj
  //           this.getStrat(res.obj._id)
  //           this.saved.emit(res.obj)
  //           // this.router.navigate(['strat/' + res.obj._id]);
  //         },
  //         error => {console.log(error)}
  //       );
  //   } else {
  //     this.stratService.saveStrat(this.fetchedStrat)
  //       .subscribe(
  //         res => {
  //           this.toastr.success('Great!', res.message)
  //           // this.fetchedStrat = res.obj
  //           this.getStrat(res.obj._id)
  //           this.saved.emit(res.obj)
  //           // this.router.navigate(['strat/' + res.obj._id]);
  //         },
  //         error => {
  //           this.toastr.error('Error!', error.message)
  //           console.log(error)
  //         }
  //       );
  //   }
  // }
  //
  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedStrat._id).then(function(){
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
  //     this.fetchedStrat.categories.forEach((fetchedCategorie, indexFetched) => {
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
  //     this.fetchedStrat.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard1[indexHard].selected = true
  //       }
  //     })
  //   })
  // }




  getStrat(id : string) {
    this.stratService.getStrat(id)
      .subscribe(
        res => {
          let categName0 = ''
          let categName1 = ''
          let categName2 = ''
          this.fetchedStrat = <Strat>res
          // console.log(this.fetchedStrat.categorie)
          // if(this.fetchedStrat.categorie.categ0.length)
          //   categName0 = this.fetchedStrat.categorie.categ0[0].name
          // if(this.fetchedStrat.categorie.categ1.length)
          //   categName1 = this.fetchedStrat.categorie.categ1[0].name
          // if(this.fetchedStrat.categorie.categ2.length)
          //   categName2 = this.fetchedStrat.categorie.categ2[0].name
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


          this.fetchedStrat.dateStrat.startString = this.authService.isoDateToHtmlDate(this.fetchedStrat.dateStrat.start)
          this.fetchedStrat.dateStrat.endString = this.authService.isoDateToHtmlDate(this.fetchedStrat.dateStrat.end)


          let durationStrat = +new Date(this.fetchedStrat.dateStrat.end) - +new Date(this.fetchedStrat.dateStrat.start)
          let timeSpent = +new Date() - +new Date(this.fetchedStrat.dateStrat.start)
          // console.log(durationStrat)
          // console.log(timeSpent)
          this.fetchedStrat.dateStrat.percentageProgress = Math.round((timeSpent / durationStrat) * 100)
          // console.log(this.fetchedStrat.dateStrat.percentageProgress)


        },
        error => {
          console.log(error);
        }
      )
  }


  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.stratService.deleteStrat(id)
        .subscribe(
          res => {
            this2.toastr.success('Great!', res.message);
            resolve(res)
          },
          error => {
            console.log(error);
            reject(error)
          }
        )
      })
  }


}
