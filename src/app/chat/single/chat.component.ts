import { Component, OnInit, OnDestroy, Input , ViewChild, ElementRef} from '@angular/core';

import { ChatService } from '../chat.service';
import { Chat } from '../chat.model';
import { Search, PaginationData } from '../../shared/shared.model'
import { Strat } from '../../strat/strat.model';
import { Mission } from '../../mission/mission.model';
import { AuthService} from '../../auth/auth.service';
import {Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() search: Search = new Search()
  @Input() onlylastPost: boolean = false
  @Input() addMessage: boolean = true
  @Input() linkGoToChat: string = ''

  @ViewChild('readChat', { read: ElementRef }) public readChat: ElementRef;
  loading: boolean;
  messages = [];
  fetchedOldChats: Chat[] = []
  connection;
  message: Chat = new Chat();

  paginationData: PaginationData = new PaginationData()


  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
  ) { }

  sendMessage() {
    if(this.message.chatName.charCodeAt(0) === 10 && this.message.chatName.length === 1) {
      this.message.chatName = '';
      return;
    }
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
      // setTimeout(()=>this.readChat.nativeElement.scrollTop += 10000 , 1);


      // try {
      //     this.readChat.nativeElement.scrollTop = this.readChat.nativeElement.scrollHeight;
      // } catch(err) { }

    }
  }

  goToChat() {
    this.router.navigate([this.linkGoToChat]);
  }
  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.getOldChats(1, this.search)
      if(this.connection)
        this.connection.unsubscribe();

      this.connection = this.chatService.getMessages(this.search.stratId).subscribe(message => {
        this.messages.push(message);
        // console.log(this.messages.length )
        // if (this.messages.length > this.paginationData.itemsPerPage)
        //   this.messages.splice(0, 1);


      })
    })
  }

  ngAfterViewChecked() {
    this.readChat.nativeElement.scrollTop += 10000
  }


  buttonGetOldChats() {
    this.paginationData.currentPage++;
    this.getOldChats(this.paginationData.currentPage, this.search)
  }

  getOldChats(page: number, search: any) {
    this.loading = true;
    this.chatService.getChats(page, search)
      .subscribe(
      res => {
        this.paginationData = res.paginationData;
        // this.messages = res.data
        res.data.reverse();
        res.data.forEach(obj => {
          this.messages.unshift(obj)
        })
        this.loading = false;
        // setTimeout(()=>this.readChat.nativeElement.scrollTop += 10000 , 1);
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
