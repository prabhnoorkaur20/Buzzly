import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: { sender: string; text: string }[] = []; // Corrected declaration
  newMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    // Initialize messages (replace with your actual data fetching logic)
    this.messages = [
      { sender: 'user1', text: 'Hello!' },
      { sender: 'user2', text: 'Hi there!' },
    ];
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ sender: 'you', text: this.newMessage });
      this.newMessage = '';
    }
  }
}