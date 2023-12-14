import { Component, Input } from '@angular/core';
import { ChatGPTService } from '../chat-gpt.service';
import { chatGpt } from '../chatGpt';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {
  @Input()
  userInput: string="";
  @Input()
  language: string = "";
  translateSnippet: chatGpt = {} as chatGpt;
  languageSelect: string[] = [
  "HTML",
  "Javascript",
  "Python",
  "C#"];
  response: string = "";
  
  constructor (private chatGPTService: ChatGPTService) {}
  translateCode(){
    this.translateSnippet.prompt = this.userInput + "\n" + "Explain what this " + this.language + " code snippet does briefly";
    this.chatGPTService.GetAnswer(this.translateSnippet).subscribe((translateEvent)=>
     {this.translateSnippet.response = translateEvent.response; this.response = this.translateSnippet.response;
      console.log(this.translateSnippet.response); console.log(this.translateSnippet.prompt)})
        
    }
    
}
