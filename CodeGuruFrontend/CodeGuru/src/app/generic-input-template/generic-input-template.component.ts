import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGPTService } from '../chat-gpt.service';
import { changecode } from '../../assets/CodeEditor';

@Component({
  selector: 'app-generic-input-template',
  templateUrl: './generic-input-template.component.html',
  styleUrls: ['./generic-input-template.component.css']
})

export class GenericInputTemplateComponent implements OnInit {

  language: string = "";
  template: string = "";
  inputsToInclude: string[] = [];
  prompt: string = "";
  response: string = "";
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
    this.template
        
  }

  GetNumberOfInputs(numInputs: string){
    let numInputsInt = parseInt(numInputs);
    this.filteredNumbers = this.numbersSelect.filter(n => n <= numInputsInt);
  }

  AddToList(textToAdd: string, index: number){

    if ((this.inputsToInclude.length) === index){
      this.inputsToInclude.push(textToAdd)
      console.log(this.inputsToInclude)
    }
    else {
        //*****************ADD SPLICE ***************/
    }
  }

  GetCode(){

    this.prompt = this.language + " " + this.template;
    this.inputsToInclude.forEach((input)=>{
      this.prompt = this.prompt + " " + input;
    
      }
    );
    
    this.chatGptService.GetAnswer(this.prompt).subscribe(
      (answerResult) =>{ 
        this.response = answerResult;
        changecode(this.response, "html");
        
      }
    );

  }

  CopyToClipboard(text){
    navigator.clipboard.writeText(text)
    
  }
  
}
