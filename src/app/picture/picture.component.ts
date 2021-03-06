import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { Form } from './form/form.model';
import {GlobalEventsManager} from '../globalEventsManager';
import { ShowNavBarData } from '../shared/shared.model';
// import { ProjectSingleComponent }  from '../projectSingle.component';
// import { EditOptionsComponentDialog } from './form/single/modalLibrary/modalLibrary.component';
// import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})

export class PictureComponent {
  @Input() forms: Form[] = [];
  @Input() isInNewUser: boolean = false;
  @Input() addPicture: boolean = true
  @Input() isInList: boolean = false

  @Input() loadSinglePicture: boolean = false
  @Input() userIdToOpenProfile: string = ''
  @Input() deletePicture: boolean = true
  @Output() getPicture: EventEmitter<any> = new EventEmitter();
  @Output() pictureRemoved: EventEmitter<any> = new EventEmitter();
  // @Input() ngStyleImg: string = '';
  // @Input() useDialog: boolean = true


  constructor(
    private globalEventsManager: GlobalEventsManager,
    // public dialog: MatDialog,
  ) {}

  // openDialog(positionImage: string) {
  //   let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.forms.push(result)
  //       this.getPicture.emit(result)
  //     }
  //   })
  // }
  onPassForm(result) {
    this.forms.push(result);
    this.getPicture.emit(result);
  }
  removePic(i) {
    this.forms.splice(i, 1);
    this.pictureRemoved.emit();
  }
  //might be deprecated
  openProfile() {
    // if(this.userIdToOpenProfile) {
      const showNavBarData = new ShowNavBarData()
      showNavBarData.search.typeScreen = 'profile'
      showNavBarData.search.typeObj = 'user'
      showNavBarData.showNavBar = 1
      showNavBarData.search.userId = this.userIdToOpenProfile
      this.globalEventsManager.showNavBarRight(showNavBarData);
    }
  // }

}
