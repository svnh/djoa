import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
import { Right} from '../../right/right.model';
import { Companie } from '../../companie/companie.model';
import { CompanieService } from '../../companie/companie.service';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Search } from '../../shared/shared.model';
import { ShowNavBarData} from '../../shared/shared.model';
import { GlobalEventsManager} from '../../globalEventsManager';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../user.component.css'],

})

export class ProfileComponent implements OnInit, OnChanges {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();
  editSettings: boolean = false;
  editMode: boolean = false;
  fetchedCompanies: Companie[] = []
  autocompleteCompanie: string = '';
  step = -1;
  fetchedTypeUsers = []
  autocompleteTypeUser: string = '';

  // fetchedRights: Right[] = []


  fetchedUser: User = new User();


  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    private globalEventsManager: GlobalEventsManager,
    // public dialog: MatDialog,
    private router: Router,
    private location: Location,
    // private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private authService: AuthService,
    private companieService: CompanieService,
  ) {
  }


    ngOnInit() {
      // this.myForm = this._fb.group({
      //     email: [this.emailValidator],
      //     typeUsers: [''],
      //     language: [''],
      //     colorCalendar: [''],
      //     otherData: [''],
      //     name: ['', [Validators.required, Validators.minLength(3)]],
      //     lastName: ['', [Validators.required, Validators.minLength(3)]],
      //     phoneNumber: [''],
      //     fax: [''],
      //     title: [''],
      //     typeClient: [''],
      //     statusHouse: [''],
      //     detailHouse: this._fb.group({
      //       typeHouse: [''],
      //       surface: [''],
      //       accesCode: [''],
      //       floor: [''],
      //       accessType: [''],
      //     }),
      //     address: this._fb.group({
      //       address: [''],
      //       city: [''],
      //       state: [''],
      //       zip: [''],
      //     })
      //
      // })

      // this.fetchedUser.isExternalUser = this.search.isExternalUser
      // console.log(this.search.userId)
      // this.activatedRoute.params.subscribe((params: Params) => {
      //   if(params['id']) {
      //       this.getUser(params['id'])
      //   }
      // })
    }

    setStep(index: number) {
      this.step = index;
    }

    ngOnChanges() {
      if (this.search.userId) {
        this.getUser(this.search.userId)
      }
      if (this.search.section === 'settings') {
        this.step = 1
      }
    }

    logout() {

      this.authService.logout();
      let this2 = this
      // setTimeout(function(){
          this2.router.navigate(['/user/login']);
      // }, 150);

    }

    isAdmin() {
      // return this.authService.getCurrentUser().rights.some(right => right.detailRight.nameRight === 'admin');
      return this.authService.getCurrentUser().isAdmin;
    }
    openDeleteConfirmation() {
        const newShowNavBarData = new ShowNavBarData()
        newShowNavBarData.search.typeScreen = 'deleteConfirmation'
        newShowNavBarData.search.typeObj = 'user'
        newShowNavBarData.search.userId = this.fetchedUser._id
        this.globalEventsManager.showNavBarRight(newShowNavBarData)
    }
  // searchCompanies() {
  //   if(!this.autocompleteCompanie) {
  //     this.fetchedCompanies = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteCompanie,
  //       };
  //     this.getCompanies(1, search)
  //   }
  // }

  // getCompanies(page: number, search: any) {
  //   this.companieService.getCompanies(page, search)
  //     .subscribe(
  //       res => {
  //         this.fetchedCompanies = res.data
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  // selectRight(right: Right) {
  //   this.fetchedUser.rights = [right]
  // }

  // selectOwnerCompanies(companie: Companie) {
  //   this.fetchedUser.ownerCompanies = [companie]
  // }


  // getPicture(result){
  //   console.log(result)
  // }

  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     this.fetchedUser.profile.profilePicture.push(result)
  //   //   }
  //   // })
  // }
  // removePic(i) {
  //   this.fetchedUser.profile.profilePicture.splice(i, 1);
  // }

  // autocolplete typeUser
  // searchTypeUser() {
  //   if(!this.autocompleteTypeUser) {
  //     this.fetchedTypeUsers = []
  //   } else {
  //     this.fetchedTypeUsers = this.typeUser.filter((el) =>
  //       el.toLowerCase().indexOf(this.autocompleteTypeUser.toLowerCase()) > -1
  //     );
  //   }
  // }
  selectTypeUser(typeUser) {
    this.autocompleteTypeUser = '';
    this.fetchedTypeUsers = [];
    this.fetchedUser.typeUsers.push(typeUser);
  }
  removeTypeUser(i: number) {
    this.fetchedUser.typeUsers.splice(i, 1);
  }
  // autocolplete typeUser

  // emailValidator(control: any) {
  //   let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  //
  //   if (!EMAIL_REGEXP.test(control.value)) {
  //     return {invalidEmail: true};
  //   }
  // }

  // goBack() {
  //   this.location.back();
  // }
  //
  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedUser._id).then(function(){
  //         this2.router.navigate(['user']);
  //       })
  //
  //     }
  //   })
  // }

  // saveAndCreateProject() {
  //   this.save()
  //   this.router.navigate(['project/new/' + this.fetchedUser._id])
  // }
  //
  // sendEmailToUserToJoinCompanie() {
  //   this.userService.sendEmailToUserToJoinCompanie(this.fetchedUser)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message)
  //       },
  //       error => {
  //         console.log(error)
  //         this.toastr.error('Error!')
  //       }
  //     );
  // }

  save() {
    if (this.fetchedUser._id) {
      this.userService.updateUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message);
          },
          error => {
            this.toastr.error('Error!');
            console.log(error);
          }
        );
    } else {
      this.userService.saveUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message);
            this.fetchedUser = res.obj;
          },
          error => {
            console.log(error);
            this.toastr.error('Error!');
          }
        );
    }
  }


  navigate(id: string){
    this.router.navigate(['user/' + id])
  }
//
isUserIsMyself() {
  if(this.authService.getCurrentUser()._id === this.fetchedUser._id) {
    return true
  }
  return false
}


  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res

        },
        error => {
          console.log(error);
        }
      )
  }


  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userService.deleteUser(id)
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
  // ngOnDestroy() {
  //   console.log('destroy')
  //   // prevent memory leak when component destroyed
  //   // this.subscription.unsubscribe();
  // }
}
