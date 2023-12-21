import { Component, Input, OnInit, Output, Query } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGPTService } from '../chat-gpt.service';
import { changecode } from '../../assets/CodeEditor';
import { chatGpt } from '../chatGpt';
import { Secret } from '../Secret';
import { QueryTemplate } from '../query-template';

@Component({
  selector: 'app-generic-input-template',
  templateUrl: './generic-input-template.component.html',
  styleUrls: ['./generic-input-template.component.css']
})


export class GenericInputTemplateComponent implements OnInit {


  @Input()queryTemplateChild: QueryTemplate = {} as QueryTemplate; 

  chatGpt: chatGpt = {} as chatGpt;
  
  language: string = "";
  template: string = "";
  inputsToInclude: string[] = [];
  filteredNumbers: number[] = [];
  numbersSelect: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10 ];
  
  constructor(private actRoute: ActivatedRoute, private chatGptService: ChatGPTService) { }
  
  ngOnInit(): void {
    this.language = [this.actRoute.snapshot.params['language']].toString();
    this.template = [this.actRoute.snapshot.params['template']].toString();
        
  }

  GetNumberOfInputs(numInputs: string){
    let numInputsInt = parseInt(numInputs);
    this.filteredNumbers = this.numbersSelect.filter(n => n <= numInputsInt);
  }

  AddToList(textToAdd: string, index: number){

    if ((this.inputsToInclude.length) === index){
      this.inputsToInclude.push(textToAdd)
    }
    else {
        //*****************ADD SPLICE ***************/
    }
  }

  GetCode(){
    this.chatGpt.prompt = "give me code for a simple " + this.queryTemplateChild.elementType + " " + this.queryTemplateChild.language;
    this.inputsToInclude.forEach((input)=>{
      this.chatGpt.prompt = this.chatGpt.prompt + " " + input;  
      this.chatGpt.prompt = this.chatGpt.prompt + " " + input;  
      }
    );

    this.chatGptService.GetAnswer(this.chatGpt, 'newchatGpt').subscribe(
      (answerResult) =>{ 
        var answer = answerResult.response.split("```")
        this.chatGpt.response =  answer[1];
        var lines = this.chatGpt.response.split('\n');
        lines = lines.splice(2, lines.length);
        this.chatGpt.response = ""
        lines.forEach((line) => { 
          this.chatGpt.response = this.chatGpt.response + line + '\n'; 
         }
        )
        changecode(this.chatGpt.response, this.language);       
      }
    );

    this.inputsToInclude.length = 0;

  }

  CopyToClipboard(text){
    navigator.clipboard.writeText(text)
    
  }
  
  
}