import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/services/admin.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { DocumentService } from '../../document/document.service';
import { User } from '../../user/user.model';
import { Document } from '../../document/document.model';
import { NotifChat } from './notif.model';
import { CompanieGuardService } from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
import { ChangeDetectionStrategy } from '@angular/core';
// import { GlobalEventsManager} from '../../globalEventsManager';
import { ChatService } from '../../chat/chat.service';
// import { Notification} from '../../notification/notification.model';
// import {Observable} from 'rxjs/Rx';
import { ShowNavBarData } from '../../home/home.model'
import { GlobalEventsManager } from '../../globalEventsManager';
import { Search } from '../../home/home.model'


@Component({
  selector: 'app-chat-unread-in-missions',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chatUnreadInMissions.component.html',
  styleUrls: ['./notif.component.css']
})
export class ChatUnreadInMissions implements OnInit {
  @Output() goToEmit: EventEmitter<any> = new EventEmitter();

  // showNavBar: boolean = false;
  // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  notifChatsInStrats: NotifChat[] = []
  notifChatsInMissions: NotifChat[] = []
  myDocuments: Document[] = []
  newMissionDocs = []
  documentsByMissions = []
  search: Search = new Search()
  // fetchedNotifications: Notification[] = [];
  // notificationsNotRead: number=0;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private adminService: AdminService,
    private chatService: ChatService,
    private documentService: DocumentService,
    private router: Router,
    // private companieGuardService: CompanieGuardService,
    // private paiementGuardService: PaiementGuardService,
  ) {
    // this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
    //     // mode will be null the first time it is created, so you need to igonore it when null
    //     if (mode !== null) {
    //       this.showNavBar = mode;
    //       this.fetchedUser = this.authService.getCurrentUser()
    //     }
    // });
  }

  getChatUnreadInMissions() {
    this.chatService.getChatUnreadInMissions()
      .subscribe(
      res => {
        this.notifChatsInMissions = res.obj
      },
      error => {
        console.log(error);
      }
      );
  }

  ngOnInit() {
    this.getChatUnreadInMissions()
  }

  goTo(typeObj: string, missionId: string) {
    this.goToEmit.emit({typeObj, missionId})
  }

}
