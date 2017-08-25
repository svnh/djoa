import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {MissionService} from '../mission.service';
import {ProductService} from '../../product/product.service';
import { ProjectService} from '../../project/project.service';

import {Mission} from '../mission.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService} from '../../user/user.service';
import { QuoteService } from '../../quote/quote.service';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';
import {Search} from '../../mainPageHome/mainPageHome.model'



@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['../mission.component.css'],
})
export class MissionComponent implements OnInit {
  @Output() newMissionSaved: EventEmitter<any> = new EventEmitter();

  @Input() fetchedMission: Mission = new Mission()
  @Input() search: Search



  // statusTypes = [
  //   { label: 'Not Started', value: '' },
  //   { label: 'Pending', value: 'pending' },
  //   { label: 'Done', value: 'done' }
  // ]

  // showPaiements: boolean = false

  // autocompleteUser: string = '';
  // autocompleteProject: string = '';
  // fetchedProducts: Product[] = []
  // fetchedProjects: Project[] = []
  // currentUser: User = new User()
  // imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  // imgSignatureBase64Temp = ''
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []

  myForm: FormGroup;
  // autocompleteProduct: String = ''
  // fetchedUsers: User[] = [];
  // arrayContentToSearch =[]

//   paiementsTypes = [
//     { label: 'cheque', value: 'check' },
//     { label: 'Espece', value: 'cash' }
// ]
  constructor(
    private missionService: MissionService,
    private quoteService: QuoteService,
    // private projectService: ProjectService,
    // private userService: UserService,
    // private productService: ProductService,
//    private modalService: NgbModal,
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
      description: [''],
      title: [''],
      status: [''],
      startString: [''],
      endString: [''],
    })


    this.fetchedMission.dateMission.startString = this.authService.isoDateToHtmlDate(this.fetchedMission.dateMission.start)
    this.fetchedMission.dateMission.endString = this.authService.isoDateToHtmlDate(this.fetchedMission.dateMission.end)



    // this.fetchedMission
    // .datePaiementString =
    // this.authService
    // .isoDateToHtmlDate(this.fetchedMission.datePaiement)


    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params)
      if(params['id'])
        this.getMission(params['id'])

    //  if(params['idProject'])
    //   this.getProject(params['idProject'])
    })
  }




  // selectAssignedTo(event) {
  //   this.fetchedMission.users = [event]
  // }


  save() {

      this.fetchedMission.dateMission
      .start = this.authService
      .HTMLDatetoIsoDate(this.fetchedMission.dateMission.startString)

      this.fetchedMission.dateMission
      .end = this.authService
      .HTMLDatetoIsoDate(this.fetchedMission.dateMission.endString)


    // this.fetchedMission.datePaiement = this.authService.HTMLDatetoIsoDate(this.fetchedMission.datePaiementString)
    if(this.fetchedMission._id) {
      this.missionService.updateMission(this.fetchedMission)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.getMission(res.obj._id)
            // this.fetchedMission = res.obj
            //this.router.navigate(['mission/edit/' + this.fetchedMission._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.missionService.saveMission(this.fetchedMission)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.getMission(res.obj._id)
            // this.fetchedMission = res.obj
            // this.newMissionSaved.emit()
            // if(this.showHeader)
            //   this.router.navigate(['mission/edit/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }

  }







  goBack() {
    this.location.back();
  }





  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.missionService.deleteMission(id)
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


  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedMission._id).then(function(){
          this2.router.navigate(['mission']);
        })

      }
    })
  }




  getMission(id: string) {
    this.missionService.getMission(id)
      .subscribe(
        res => {
          this.fetchedMission = res


          this.fetchedMission.dateMission
            .startString = this.authService
              .isoDateToHtmlDate(this.fetchedMission.dateMission.start)

          this.fetchedMission.dateMission
            .endString = this.authService
              .isoDateToHtmlDate(this.fetchedMission.dateMission.end)



          // this.fetchedMission
          // .datePaiementString =
          // this.authService
          // .isoDateToHtmlDate(this.fetchedMission.datePaiement)
        },
        error => {
          console.log(error);
        }
      )
  }
  isAdmin() {
    return this.authService.isAdmin();
  }



}
