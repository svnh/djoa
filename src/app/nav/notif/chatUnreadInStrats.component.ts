import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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


@Component({
  selector: 'app-chat-unread-in-strats',
  templateUrl: './chatUnreadInStrats.component.html',
  styleUrls: ['./notif.component.css']
})
export class ChatUnreadInStrats implements OnInit {
  @Output() goToEmit: EventEmitter<any> = new EventEmitter();

  // showNavBar: boolean = false;
  // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  notifChatsInStrats: NotifChat[] = []
  // notifChatsInMissions: NotifChat[] = []
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
  ngOnInit() {
    this.getChatUnreadInStrats()
  }

  getChatUnreadInStrats() {
    this.chatService.getChatUnreadInStrats()
      .subscribe(
      res => {
        this.notifChatsInStrats = res.obj
      },
      error => {
        console.log(error);
      }
      );
  }

  goTo(typeObj: string, missionId: string) {
    this.goToEmit.emit({typeObj, missionId})
  }

}
