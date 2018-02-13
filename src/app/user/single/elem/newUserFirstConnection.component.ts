import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Search } from '../../../shared/shared.model';
import { ShowNavBarData} from '../../../shared/shared.model';
import { GlobalEventsManager} from '../../../globalEventsManager';
import { AuthService} from '../../../auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService} from '../../user.service';
import { ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-new-user-first-connection',
  templateUrl: './newUserFirstConnection.component.html',
  styleUrls: ['../../user.component.css'],
})

export class NewUserFirstConnectionComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();
  @Input() fetchedUser: User = new User();
  public myForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private _fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastsManager,
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
  ) { }

  // save() {
  //   // this.saved.emit();
  //   // this.closeRight();
  // }

  save() {
    if (this.fetchedUser._id) {
      this.userService.updateUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message);
            this.router.navigate(['/']);
            const newShowNavBarData = new ShowNavBarData()
            newShowNavBarData.showNavBar = 1
            newShowNavBarData.search.typeObj = 'project'
            this.globalEventsManager.showNavBarLeft(newShowNavBarData);
            this.globalEventsManager.showNavBarTop(newShowNavBarData);
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

  pictureRemoved() {
    this.saved.emit();
  }

  closeRight() {
    const showNavBarData = new ShowNavBarData();
    showNavBarData.showNavBar = -1;
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
          this.getUser(params['id'])
      }
    })

    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: [''],
      fax: [''],
      title: [''],
      typeClient: [''],
    })
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

  openDeleteConfirmation() {
    const newShowNavBarData = new ShowNavBarData();
    newShowNavBarData.search.typeScreen = 'deleteConfirmation';
    newShowNavBarData.search.typeObj = 'user';
    newShowNavBarData.search.userId = this.fetchedUser._id;
    this.globalEventsManager.showNavBarRight(newShowNavBarData);
  }

  isAdmin() {
    return this.authService.getCurrentUser().rights.some(right => right.detailRight.nameRight === 'admin');
  }



}
