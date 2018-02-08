import { Component, OnInit } from '@angular/core';
import { NotifChat } from './notif.model';
import { ChatService } from '../../chat/chat.service';
import { ChatUnreadInMissions } from './chatUnreadInMissions.component';
// import { AuthService } from '../../auth/auth.service';
// import { AdminService } from '../../admin/services/admin.service';
// import { Router } from '@angular/router';
// import { UserService } from '../../user/user.service';
// import { DocumentService } from '../../document/document.service';
// import { User } from '../../user/user.model';
// import { Document } from '../../document/document.model';
// import { CompanieGuardService } from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
// import { ChangeDetectionStrategy } from '@angular/core';
// import { GlobalEventsManager} from '../../globalEventsManager';
// import { Notification} from '../../notification/notification.model';
// import {Observable} from 'rxjs/Rx';
// import { ShowNavBarData } from '../../shared/shared.model'
// import { GlobalEventsManager } from '../../globalEventsManager';
// import { Search } from '../../shared/shared.model'

@Component({
  selector: 'app-notif-total',
  templateUrl: './notifTotal.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifTotal implements OnInit {
  notifChatsInMissions: NotifChat[] = []
  countTotal:number = 0;
  // @ViewChild(ChatUnreadInMissions) chatUnreadInMissions: ChatUnreadInMissions
  // @Output() goToEmit: EventEmitter<any> = new EventEmitter();

  // showNavBar: boolean = false;
  // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  // notifChatsInStrats: NotifChat[] = []
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
    console.log(this.countTotal)
  }
  myDocuments(result) {
    console.log(this.countTotal)
    result.forEach(document => {
      this.countTotal += document.myActivityPendingTasks
    })
    console.log(this.countTotal)
  }







  ngOnInit() {
    // this.ChatUnreadInMissions

  }


}
