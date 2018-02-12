import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Search } from '../../../shared/shared.model';
import { ShowNavBarData} from '../../../shared/shared.model';
import { GlobalEventsManager} from '../../../globalEventsManager';
import { AuthService} from '../../../auth/auth.service';



@Component({
  selector: 'app-newUser',
  templateUrl: './newUser.component.html',
  styleUrls: ['../../user.component.css'],
})

export class NewUserComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();
  @Input() fetchedUser: User = new User();
  public myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private _fb: FormBuilder,
    private globalEventsManager: GlobalEventsManager,
  ) { }

  save() {
    this.saved.emit();
    this.closeRight();
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
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: [''],
      fax: [''],
      title: [''],
      typeClient: [''],
    })
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
