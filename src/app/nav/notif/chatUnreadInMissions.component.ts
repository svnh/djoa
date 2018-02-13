import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifChat } from './notif.model';
import { ChatService } from '../../chat/chat.service';
import { Router } from '@angular/router';
import { Search } from '../../shared/shared.model';
// import { AuthService } from '../../auth/auth.service';
// import { AdminService } from '../../admin/services/admin.service';
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


@Component({
  selector: 'app-chat-unread-in-missions',
  templateUrl: './chatUnreadInMissions.component.html',
  styleUrls: ['./notif.component.css']
})
export class ChatUnreadInMissions implements OnInit {
  @Output() goToEmit: EventEmitter<any> = new EventEmitter();
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();
  notifChatsInMissions: NotifChat[] = [];
  nbNotifChat = 0;

  // showNavBar: boolean = false;
  // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  // notifChatsInStrats: NotifChat[] = []
  // myDocuments: Document[] = []
  // newMissionDocs = []
  // documentsByMissions = []
  // fetchedNotifications: Notification[] = [];
  // notificationsNotRead: number=0;

  constructor(
    private chatService: ChatService,
    private router: Router,
  ) {
  }



  ngOnInit() {
    this.getChatUnreadInMissions()
  }
  getChatUnreadInMissions() {
    this.chatService.getChatUnreadInMissions()
      .subscribe(
      res => {
        this.notifChatsInMissions = res.obj
        this.notifChatsInMissions.forEach(singleNotifChatsInMissions => {
          this.nbNotifChat += singleNotifChatsInMissions.countUnread;
        })
        this.dataUpdated.emit(this.notifChatsInMissions)
      },
      error => {
        console.log(error);
      }
      );
  }
  goTo(typeObj: string, id: string) {
    // this.goToEmit.emit({typeObj, missionId})
    this.router.navigate([typeObj + '/' + id]);
  }

}
