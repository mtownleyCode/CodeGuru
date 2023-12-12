import { Component, Input, OnInit } from '@angular/core';
import { ChatGPTService } from '../chat-gpt.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit{
  @Input()
  queryInput: string = "";
  constructor(private chatGptService: ChatGPTService){}
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  addQuery(){
    this.chatGptService.GetAnswer(this.queryInput).subscribe((queryResult)=> console.log(queryResult))
  }

}
