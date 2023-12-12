import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatGptService } from '../chat-gpt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  messages: string[] = [];
  userInput: string = '';

  constructor(private http: HttpClient) { }

  sendMessage() {
    if (this.userInput.trim() === '') {
      return;
    }
    this.messages.push(`You: ${this.userInput}`);
    this.http.post<any>('/api/ChatGptApi/getanswer?propmt=html%20table',
     {
      // Pass your OpenAI API parameters here     
        prompt: this.userInput,
        max_tokens: 100,
        temperature: 0.7,
        stop: '\n',
        engine: 'davinci',           
      chatGptUrl: ChatGptService,    
      // Add any additional parameters required by OpenAI
    }).subscribe(response => {
      this.messages.push(`ChatGPT: ${response.choices[0].text.trim()}`);
    }, error => {
      console.error('Error sending message:', error); // Log the error here
      this.messages.push('Error sending message. Please try again.');
    });
    this.userInput = '';
  }
}

