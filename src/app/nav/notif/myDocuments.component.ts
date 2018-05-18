import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentService } from '../../document/document.service';
import { Document } from '../../document/document.model';
import { NotifChat } from './notif.model';
import { Search } from '../../shared/shared.model';
import { Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
// import { AdminService } from '../../admin/services/admin.service';
// import { UserService } from '../../user/user.service';
// import { User } from '../../user/user.model';
// import { CompanieGuardService } from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
// import { ChangeDetectionStrategy } from '@angular/core';
// import { GlobalEventsManager} from '../../globalEventsManager';
// import { ChatService } from '../../chat/chat.service';
// import { Notification} from '../../notification/notification.model';
// import {Observable} from 'rxjs/Rx';
// import { ShowNavBarData } from '../../shared/shared.model'
// import { GlobalEventsManager } from '../../globalEventsManager';


@Component({
  selector: 'app-my-documents',
  templateUrl: './myDocuments.component.html',
  styleUrls: ['./notif.component.css']
})
export class MyDocuments implements OnInit {
  @Output() goToEmit: EventEmitter<any> = new EventEmitter();
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search()
  myDocuments: Document[] = []
  myActivityPendingTasksDocuments = 0;

  // showNavBar: boolean = false;
  // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  // documentsByMissions = []
  // notifChatsInStrats: NotifChat[] = []
  // notifChatsInMissions: NotifChat[] = []
  // newMissionDocs = []
  // documentsByMissions = []
  // fetchedNotifications: Notification[] = [];
  // notificationsNotRead: number=0;


  constructor(
    // private chatService: ChatService,
    private documentService: DocumentService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.getMyDocuments()
  }


  getMyDocuments() {
    const search = { myDocuments: true }
    this.documentService.getDocuments(1, search)
      .subscribe(
      res => {
        this.myActivityPendingTasksDocuments = 0
        this.myDocuments = res.data
        this.dataUpdated.emit(this.myDocuments)
        this.myDocuments.forEach(document => {
          // console.log(document.myActivityPendingTasks)
          this.myActivityPendingTasksDocuments += document.myActivityPendingTasks
        })
        // console.log(this.myDocuments)
      },
      error => {
        console.log(error);
      }
      );
  }

  goTo(typeObj: string, missionId: string) {
    this.router.navigate([typeObj + '/' + missionId]);
    this.goToEmit.emit({typeObj, missionId});
  }

}
