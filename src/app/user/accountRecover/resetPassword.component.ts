import {Component, OnInit, Renderer, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Reset} from '../../auth/resetPassword';
import {ToastsManager} from 'ng2-toastr';
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../shared/shared.model';
import { User } from '../user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPagesStyle.css']
})

export class ResetPasswordComponent implements OnInit, AfterViewInit {
  fetchedUser: User = new User();
  myForm: FormGroup;
  password: FormControl;
  token: string;
  @ViewChild('newPassword') newPassword: ElementRef;

  constructor(
    private _fb: FormBuilder,
    private globalEventsManager: GlobalEventsManager,
    private _authService: AuthService, private _router: Router,
              private _activatedRoute: ActivatedRoute, private toastr: ToastsManager, private renderer: Renderer) {
    this.token = _activatedRoute.snapshot.params['token'];
  }

  ngOnInit() {

    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.myForm = this._fb.group({
      password: this.password
    });

    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.newPassword.nativeElement, 'focus', []);
    }, 50);
  }

  // submit the login form with the user credentials and navigate the user to the index page of our app
  login(email) {
    const user = {
      email: email,
      password:  this.myForm.value.password,
    }
    this._authService.signin(user)
      .subscribe(
        data => {
          // const newShowNavBarData = new ShowNavBarData()
          // newShowNavBarData.showNavBar = 1
          // newShowNavBarData.search.typeObj = 'project'
          // this.globalEventsManager.showNavBarLeft(newShowNavBarData);
          // this.globalEventsManager.showNavBarTop(newShowNavBarData);

          // const showNavBarData = new ShowNavBarData()
          // showNavBarData.search.typeScreen = 'profile'
          // showNavBarData.search.typeObj = 'user'
          // showNavBarData.showNavBar = 1
          // showNavBarData.search.userId = this.fetchedUser._id
          // this.globalEventsManager.showNavBarRight(showNavBarData);


          //console.log(data)
          // if the user credentials are correct, set the localStorage token and userId,
          // we need these info in order to do stuff later when the user is signed in and verified
          localStorage.setItem('id_token', data.token);
          localStorage.setItem('token', data.token);
          //localStorage.setItem('userId', data.userId);
          // navigate user to index page of our app

          //gooplus
          this._router.navigate(['user/' + this.fetchedUser._id]);
          // location.reload();


          // display toastr success message pop up to inform the user that he logged in successfully
          this.toastr.success('You have been logged in!');
        },
        error => console.log(error)
      );

  }



  onSubmit() {
    const password = new Reset(null, this.token, this.myForm.value.password);
    // console.log(password);
    this._authService.reset(password)
      .subscribe(
        data => {
          // console.log(data)
          this.fetchedUser = data.obj
          this.login(data.obj.email)
          // this._router.navigate(['/user/login']);
          this.toastr.success('Your password has been changed succesfully');
        },
        error => console.log(error)
      );
  }
}
