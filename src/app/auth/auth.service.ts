import {Injectable} from '@angular/core';

import {UserAuth} from './user.model';


import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import {ToastsManager} from 'ng2-toastr';
import {ErrorService} from '../errorHandler/error.service';
import {Reset} from './resetPassword';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';
// import {UserService} from '../user/user.service'
import {User} from '../user/user.model'
import { ShowNavBarData } from '../shared/shared.model'
import { GlobalEventsManager} from '../globalEventsManager';

@Injectable()

export class AuthService {
  private url: string = '/';
  public token: string;
  private isMobileSizeScreen = false;
  public currentUser={
    userId: '',
    token: '',
    // user: {}
  //  companieId:[]

  }
  jwtHelper: JwtHelper = new JwtHelper();
  //public userId: string;
  user:User

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private router: Router,
    private globalEventsManager: GlobalEventsManager
    // private userService: UserService,
  ) {

      this.user = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')).user : null;
      // set token if saved in local storage
      //console.log('AuthService called')
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
      this.currentUser = currentUser;

      this.globalEventsManager.isMobileSizeScreenEmitter.subscribe((mode) => {
        if (mode !== null) {
          this.isMobileSizeScreen = mode;
        }
      });

  }

  // sending request to back end to register our user
  signup(user: UserAuth) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/register', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // sending request to back end to login the user
  signin(user: UserAuth) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/login', body, {headers: headers})
      .map((response: Response) => {
        let token = response.json() && response.json().token;
        let userId = response.json() && response.json().userId;
        // let user = response.json() && response.json().user;
        if (token) {

          let currentUser = {
            userId: userId,
            token: token,
            // user: user
          }

          this.token = token
          this.currentUser = currentUser
          this.user = this.jwtHelper.decodeToken(token).user
          // if (!this.isMobileSizeScreen) {
          //   setTimeout(() => this.globalEventsManager.showNavBar(true), 700)
          // }
        //  console.log(this.currentUser)
          this.globalEventsManager.isLoggedIn(true);
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }

        // let id_token = response.json() && response.json().token;
        // let userId = response.json() && response.json().userId;
        // this.id_token = id_token
        // this.userId = userId
        //
        //
        //console.log(response)
        return response.json()
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }



  isAdmin() {
    // let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;

    // if (this.user) {
    //   if (this.user.role[0] === 'admin') {
    //     return true;
    //   }
    // }
    // return false;
  }


    refreshUserMyselfToken() {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', '' + this.currentUser.token);
      return this.http.get(this.url + 'user/refreshUserMyselfToken', {headers: headers})
        .map((response: Response) => {
          const token = response.json() && response.json().token;
          const userId = response.json() && response.json().userId;
          // let user = response.json() && response.json().user;
          if (token) {

            const currentUser = {
              userId: userId,
              token: token,
              // user: user
            }
            this.token = token
            this.currentUser = currentUser
            this.user = this.jwtHelper.decodeToken(token).user
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            localStorage.setItem('id_token', token);
            localStorage.setItem('token', token);
          }


          return response.json()
        })
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
    }

  getCurrentUser() {
    // console.log(localStorage.getItem('id_token') )
    // let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    // console.log(this.user)
    return this.user
    // return userInfo
    // if (userInfo) {
    //   if (userInfo.user.role[0] === 'admin') {
    //     return true;
    //   }
    // }
    // return false;
  }

  getLanguage() {
    // let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    // console.log(userInfo.user.profile)
    return this.user.profile.language
  }

  getUserPlan() {
    // let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    // return this.user.paiement.stripe.plan

    let plan = ''
    this.user.ownerCompanies.forEach(companie => {
      plan = companie.planDetail.plan

    });
    // let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    return plan

  }
  isCurrentUserIsInSubPeriod() {
    // console.log(this.user)

    let itemFounded = false
    this.user.ownerCompanies.forEach(companie => {
      if (new Date(companie.planDetail.current_period_end) > new Date())
        itemFounded = true
    });
    // let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    return itemFounded
  }
  isCurrentUserHasCompanie(){
    // console.log(this.user)
    // let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    if(this.user.ownerCompanies.length)
      return true
    return false
  }


  isCurentUserHasAccess(nameObject, typeAccess) {

    // if(this.user.isAdminOfHisCompanie)
    //   return true
    if(!this.user.rights.length)
      return true


    return this.user.rights.some(right => {
      return right.detailRight.permissions.some(permission => {
        if(permission.namePermission === nameObject)
          return permission.access.some(access => {
            return access.typeAccess === typeAccess
          })
      })
    })
  }

  showObjHTML(nameObject) {
    let typeAccess = 'read'
    // console.log(this.isCurentUserHasAccess(nameObject, typeAccess))
    // console.log(this.isCurrentUserIsInSubPeriod())
    // console.log(this.isCurrentUserHasCompanie())
    if(
      this.isCurentUserHasAccess(nameObject, typeAccess) &&
      this.isCurrentUserIsInSubPeriod() &&
      this.isCurrentUserHasCompanie()
    )
    return true
  }

  // sending request for password reset
  forget(reset: Reset) {
    const body = JSON.stringify(reset);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/forgot', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // sending request with the newly created password
  reset(reset: Reset) {
    const body = JSON.stringify(reset);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/reset/' + reset.token, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  // logout function to be used in html file of both pages (login/register) in order to clear the localStorage from token and user id.
  logout() {
    const newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.showNavBar = -1
    this.globalEventsManager.showNavBarLeft(newShowNavBarData);
    this.globalEventsManager.showNavBarRight(newShowNavBarData);
    this.globalEventsManager.showNavBarTop(newShowNavBarData);
    this.globalEventsManager.isLoggedIn(false);
    localStorage.clear();
    this.token = null;

    // this.router.navigate(['user/login']);
    //gooplus
    //location.reload();

    this.toastr.info('You have been logged out');
  }

  // check if the user is logged in or not, if token is expired, token is deleted from localstorage
  isLoggedIn() {
    if (!tokenNotExpired()) {
      localStorage.clear();
      this.globalEventsManager.isLoggedIn(false);
    } else {
      this.globalEventsManager.isLoggedIn(true);
    }
    return tokenNotExpired();
  }


    HTMLDatetoIsoDate(htmlDate){
      let year = Number(htmlDate.toString().substring(0, 4))
      let month = Number(htmlDate.toString().substring(5, 7))
      let day = Number(htmlDate.toString().substring(8, 10))
      return new Date(year, month - 1, day)
    }
    isoDateToHtmlDate(isoDate){
      let date = new Date(isoDate);
      let dtString = ''
      let monthString = ''
      if (date.getDate() < 10) {
        dtString = '0' + date.getDate();
      } else {
        dtString = String(date.getDate())
      }
      if (date.getMonth()+1 < 10) {
        monthString = '0' + Number(date.getMonth()+1);
      } else {
        monthString = String(date.getMonth()+1);
      }
      return date.getFullYear()+'-' + monthString + '-'+dtString
    }

    getPourcentageProgress(start: Date, end: Date) {
      let durationProject = +new Date(end) - +new Date(start)
      let timeSpent = +new Date() - +new Date(start)
      let returnData = Math.round((timeSpent / durationProject) * 100)
      if(returnData>100) returnData = 100

      // console.log(returnData)
      return returnData
    }

}
