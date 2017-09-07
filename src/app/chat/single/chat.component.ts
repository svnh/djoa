import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { ChatService } from '../chat.service';
import { Chat } from '../chat.model';
import { Search, PaginationData } from '../../home/home.model'
import { Strat } from '../../strat/strat.model';
import { Mission } from '../../mission/mission.model';
import { AuthService} from '../../auth/auth.service';
import {Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() search: Search = new Search()
  loading: boolean;
  messages = [];
  fetchedOldChats: Chat[] = []
  connection;
  message: Chat = new Chat();

  paginationData: PaginationData = new PaginationData()
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService
  ) { }

  sendMessage() {
    if(this.message.chatName) {
      if(this.search.stratId) {
        let newStrat = new Strat()
        newStrat._id = this.search.stratId
        this.message.strats = [newStrat]
      }
      if(this.search.missionId) {
        let newMission = new Mission()
        newMission._id = this.search.missionId
        this.message.missions = [newMission]
      }
      // console.log(this.authService.getCurrentUser())
      this.message.users = [this.authService.getCurrentUser()]
      this.message.ownerCompanies= [this.authService.getCurrentUser().ownerCompanies[0]]
      this.chatService.sendMessage(this.message);
      this.message.chatName = '';
    }
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.getOldChats(1, this.search)
      if(this.connection)
        this.connection.unsubscribe();

      this.connection = this.chatService.getMessages(this.search.stratId).subscribe(message => {
        this.messages.push(message);
        // console.log(this.messages.length )
        if (this.messages.length > this.paginationData.itemsPerPage)
          this.messages.splice(0, 1);
      })
    })



  }



  getOldChats(page: number, search: any) {
    //this.fetchedDocuments =[]
    this.loading = true;
    this.chatService.getChats(page, search)
      .subscribe(
      res => {
        this.paginationData = res.paginationData;
        this.messages = res.data

        this.loading = false;
      },
      error => {
        console.log(error);
      }
      );
  }



  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
