import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from './socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'chat-app';
  messages: string[] = [];
  message: string = '';
  @ViewChild('messagesContainer') private messagesContainer: ElementRef | undefined;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.receiveMessages((msg: string) => {
      this.messages.push(msg); 
      this.scrollToBottom();
    });
  }

  sendMessage() {
    if (this.message) {
      this.socketService.sendMessage(this.message);
      this.message = ''; 
    }
  }
  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
