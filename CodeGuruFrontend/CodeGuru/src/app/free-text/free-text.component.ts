import { Component, Input } from '@angular/core';
import { chatGpt } from '../chatGpt';
import { ChatGPTService } from '../chat-gpt.service';
import { QueryTemplate } from '../query-template';

@Component({
  selector: 'app-free-text',
  templateUrl: './free-text.component.html',
  styleUrls: ['./free-text.component.css']
})
export class FreeTextComponent {

  userInput: string="";
  language: string = "";
  freeTextSnippet: chatGpt = {} as chatGpt;
  response: string = "";
  chatGpt: chatGpt = {} as chatGpt;

  @Input()queryTemplateChild: QueryTemplate = {} as QueryTemplate;

  constructor (private chatGPTService: ChatGPTService) {}

  freeTextCode(){
    this.freeTextSnippet.prompt = this.userInput + "\n" + this.queryTemplateChild.language
    this.chatGPTService.GetAnswer(this.freeTextSnippet, '').subscribe((freeTextEvent)=>
     { 
      this.response = freeTextEvent.response
      // var answer = freeTextEvent.response.split("```")
      
      // this.response = answer[1];
            
      // var lines = this.response.split('\n');
      // console.log("1 " + lines)
      // lines = lines.splice(1, lines.length);
      
      // console.log(lines)
      // this.response = ""
      
      // lines.forEach((line) => { 
      //   console.log(line)
      //   this.response = this.response + line + '\n'; 
      
      //   }
      // )
    })
  }

}
