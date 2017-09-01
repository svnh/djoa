import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [];
  connection;
  message;

  constructor(private chatService:ChatService) {}

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
      if(this.messages.length > 20)
        this.messages.splice(0, 1);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
