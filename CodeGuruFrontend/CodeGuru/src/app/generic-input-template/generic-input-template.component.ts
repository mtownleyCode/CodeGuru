import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGPTService } from '../chat-gpt.service';
import { changecode } from '../../assets/CodeEditor';
import { chatGpt } from '../chatGpt';

@Component({
  selector: 'app-generic-input-template',
  templateUrl: './generic-input-template.component.html',
  styleUrls: ['./generic-input-template.component.css']
})

export class GenericInputTemplateComponent implements OnInit {

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

    this.chatGpt.prompt = "give me code for a simple " + this.language + " " + this.template;
    this.inputsToInclude.forEach((input)=>{
      this.chatGpt.prompt = this.chatGpt.prompt + " " + input;
    
      }
    );

    this.chatGptService.GetAnswer(this.chatGpt).subscribe(
      (answerResult) =>{ 
        this.chatGpt.response = answerResult.response.trim();
        changecode(this.chatGpt.response, this.language);
        
      }
    );

    this.inputsToInclude.length = 0;

  }

  CopyToClipboard(text){
    navigator.clipboard.writeText(text)
    
  }
  
}