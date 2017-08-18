import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserCalendarService} from '../userCalendar.service';
import {ProductService} from '../../product/product.service';
// import { ProjectService} from '../../project/project.service';

import {UserCalendar} from '../userCalendar.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService} from '../../user/user.service';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';




@Component({
  selector: 'app-userCalendar',
  templateUrl: './userCalendar.component.html',
  styleUrls: ['../userCalendar.component.css'],
})
export class UserCalendarComponent implements OnInit {
  @Input() fetchedUserCalendar:UserCalendar = new UserCalendar()
  @Output() saved: EventEmitter<any> = new EventEmitter();

  // fetchedUserCalendar: UserCalendar = new UserCalendar()
  myForm: FormGroup;
  constructor(
    private userCalendarService: UserCalendarService,
    // private projectService: ProjectService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,

  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      title: [''],
      description: [''],
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['idUserCalendar'])
        this.getUserCalenddar(params['idUserCalendar'])
    })
  }
  selectUser(user: User) {
    this.fetchedUserCalendar.users = [user]
  }
  selectProject(project: Project) {
    this.fetchedUserCalendar.projects = [project]
  }
  removeProject() {
    // this.fetchedUserCalendar.projects.splice(i, 1);
  }
  removeUser() {
    // this.fetchedUserCalendar.users.splice(i, 1);
  }
  getUserCalenddar(id: string) {
    this.userCalendarService.getUserCalendar(id)
      .subscribe(
        res => {
          this.fetchedUserCalendar = res
        },
        error => {
          console.log(error);
        }
      )
  }

  openDialogDelete() {
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(this.fetchedUserCalendar._id).then(function(){
          // this2.router.navigate(['paiementQuote']);
        })

      }
    })
  }

  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userCalendarService.deleteUserCalendar(id)
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


    save() {
      if(this.fetchedUserCalendar._id) {
        this.userCalendarService.updateUserCalendar(this.fetchedUserCalendar)
          .subscribe(
            res => {
              this.toastr.success('Great!', res.message)
              this.saved.emit(res)
            },
            error => {
              this.toastr.error('error!', error)
            }
          )
      } else {
        this.userCalendarService.saveUserCalendar(this.fetchedUserCalendar)
          .subscribe(
            res => {
              this.toastr.success('Great!', res.message)
              this.saved.emit(res)
            },
            error => {console.log(error)}
          )
      }
    }

}
