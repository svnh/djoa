import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../auth/auth.service';
// import { AdminService } from '../../admin/services/admin.service';
// import { Router } from '@angular/router';
// import { UserService } from '../../user/user.service';
// import { DocumentService } from '../../document/document.service';
// import { User } from '../../user/user.model';
// import { Document } from '../../document/document.model';
import { NotifChat } from './notif.model';
// import { CompanieGuardService } from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
// import { ChangeDetectionStrategy } from '@angular/core';
// import { GlobalEventsManager} from '../../globalEventsManager';
import { ChatService } from '../../chat/chat.service';
// import { Notification} from '../../notification/notification.model';
// import {Observable} from 'rxjs/Rx';
// import { ShowNavBarData } from '../../shared/shared.model'
// import { GlobalEventsManager } from '../../globalEventsManager';
// import { Search } from '../../shared/shared.model'
import { ChatUnreadInMissions } from './chatUnreadInMissions.component';

@Component({
  selector: 'app-notif-total',
  templateUrl: './notifTotal.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifTotal implements OnInit {
  // @ViewChild(ChatUnreadInMissions) chatUnreadInMissions: ChatUnreadInMissions
  // @Output() goToEmit: EventEmitter<any> = new EventEmitter();

  // showNavBar: boolean = false;
  // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  // notifChatsInStrats: NotifChat[] = []
  notifChatsInMissions: NotifChat[] = []
  countTotal:number = 0;
  // myDocuments: Document[] = []
  // newMissionDocs = []
  // documentsByMissions = []
  // search: Search = new Search()
  // fetchedNotifications: Notification[] = [];
  // notificationsNotRead: number=0;

  constructor(
    private chatService: ChatService,
  ) {
  }

  chatUnreadInMissions(result) {
    result.forEach(mission => {
      this.countTotal += mission.countUnread
    })
  }
  chatUnreadInStrats(result) {
    // console.log(result)
  }
  documentsByMissions(result) {
    // console.log(result)
    result.forEach(obj => {
      obj.documents.forEach(document => {
        this.countTotal += document.myActivityPendingTasks
      });
    })
  }
  myDocuments(result) {
    result.forEach(document => {
      this.countTotal += document.myActivityPendingTasks
    })
  }







  ngOnInit() {
    // this.ChatUnreadInMissions

  }


}
