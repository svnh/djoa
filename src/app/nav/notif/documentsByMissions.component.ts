import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentService } from '../../document/document.service';
import { NotifChat } from './notif.model';
import { Search } from '../../shared/shared.model'
import { Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
// import { AdminService } from '../../admin/services/admin.service';
// import { UserService } from '../../user/user.service';
// import { User } from '../../user/user.model';
// import { Document } from '../../document/document.model';
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
  selector: 'app-documents-by-missions',
  templateUrl: './documentsByMissions.component.html',
  styleUrls: ['./notif.component.css']
})
export class DocumentsByMissions implements OnInit {
  @Output() goToEmit: EventEmitter<any> = new EventEmitter();
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();

  documentsByMissions = []
  search: Search = new Search()
  totalMyActivityPendingTasks = 0;
  // showNavBar: boolean = false;
  // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  // notifChatsInStrats: NotifChat[] = []
  // notifChatsInMissions: NotifChat[] = []
  // myDocuments: Document[] = []
  // newMissionDocs = []
  // documentsByMissions = []
  // fetchedNotifications: Notification[] = [];
  // notificationsNotRead: number=0;


  constructor(
    private router: Router,
    private documentService: DocumentService
  ) {
  }
  ngOnInit() {
    this.getDocumentsByMissions()
  }

  getDocumentsByMissions() {
    const search = new Search()
    search.myDocuments = true
    this.documentService.getDocumentsByMissions(search)
      .subscribe(
        res => {
          this.documentsByMissions = res
          this.documentsByMissions.forEach(documentsByMission => {
            documentsByMission.documents.forEach(document => {
              this.totalMyActivityPendingTasks += document.myActivityPendingTasks
            });
          })
          this.dataUpdated.emit(this.documentsByMissions)
        },
        error => { console.log(error) }
      )

  }

  goTo(typeObj: string, id: string) {
    this.router.navigate([typeObj + '/' + id]);
    // this.goToEmit.emit({typeObj, missionId})
  }

}
