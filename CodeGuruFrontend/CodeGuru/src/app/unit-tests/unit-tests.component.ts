import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../language';
import { LanguagesService } from '../languages.service';
import { ChatGPTService } from '../chat-gpt.service';
import { chatGpt } from '../chatGpt';

@Component({
  selector: 'app-unit-tests',
  templateUrl: './unit-tests.component.html',
  styleUrls: ['./unit-tests.component.css']
})
export class UnitTestsComponent implements OnInit{
  
  @Input()
  chatGpt: chatGpt = {} as chatGpt;
 
  languages: Language[] = [];
  promptToSend: string = "";

  constructor(private languagesService: LanguagesService, private chatGptService: ChatGPTService) { }

  ngOnInit(): void {
    
    this.languagesService.GetLanguages().subscribe(
      (languagesResult) =>{ 
        this.languages = languagesResult;
        console.log(this.languages)
      }
    );

  }

  GetLanguageToUse(language: string){

  }

  GetUnitTest(){

    this.chatGpt.prompt = "I need unit tests for " + this.chatGpt.prompt

    this.chatGptService.GetAnswer(this.chatGpt).subscribe(
      (answerResult) =>{ 
        
        this.chatGpt.response = answerResult.response.trim();
        console.log(this.chatGpt.response)
        // let x = document.getElementById("textAreaResponse")!;
        // x.value = "GeeksforGeeks";
                
      }
    )
  }

  CopyToClipboard(text: string){
    navigator.clipboard.writeText(text)
  }

}
