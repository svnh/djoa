import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { ChatService } from '../chat.service';
import { Chat } from '../chat.model';
import { Search } from '../../mainPageHome/mainPageHome.model'
import { Strat } from '../../strat/strat.model';

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

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(private chatService: ChatService) { }

  sendMessage() {
    let newStrat = new Strat()
    newStrat._id = this.search.stratId
    this.message.strats.push(newStrat)
    this.chatService.sendMessage(this.message);
    this.message.chatName = '';
  }

  ngOnInit() {
    console.log(this.search)
    this.getOldChats(1, this.search)

    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);

      if (this.messages.length > this.paginationData.itemsPerPage)
        this.messages.splice(0, 1);
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
