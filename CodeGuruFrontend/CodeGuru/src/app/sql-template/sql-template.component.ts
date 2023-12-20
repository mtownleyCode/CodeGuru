import { Component, Input } from '@angular/core';
import { chatGpt } from '../chatGpt';
import { ChatGPTService } from '../chat-gpt.service';
import { changecode } from '../../assets/CodeEditor';
import { SqlInput } from '../sql-input';
import { QueryTemplate } from '../query-template';

@Component({
  selector: 'app-sql-template',
  templateUrl: './sql-template.component.html',
  styleUrls: ['./sql-template.component.css']
})
export class SqlTemplateComponent {

  @Input()queryTemplateChild: QueryTemplate = {} as QueryTemplate; 
  
  chatGpt: chatGpt = {} as chatGpt;
  
  sqlInputs: SqlInput[] = [];
  
  tableName: string = "";

  singleSqlInput: SqlInput = {} as SqlInput
  charactersNeeded: boolean = true;
  filteredColumns: number[] = [];
  columnsToInclude: string[] = [];
  inputTypes: string[] = [
    "nvarchar",
    "int",
    "boolean"
  ];
  columnsSelect: number[] = [
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

    constructor(private chatGptService: ChatGPTService) { }

  GetNumberOfColoumns(columns: string){
    this.sqlInputs.length = 0;
    let columnsInt: number = parseInt(columns);    
    this.filteredColumns = this.columnsSelect.filter(n => n <= columnsInt)
    this.filteredColumns.forEach(()=>{
      this.singleSqlInput.columnName = "";
      this.singleSqlInput.inputType = 'nvarchar';
      this.singleSqlInput.numberofChars = 0;

      this.sqlInputs.push(this.singleSqlInput);
      console.log(this.sqlInputs)
    })
  }

    
  CheckInputType(inputType: string, index: number){
    console.log(index)
    this.sqlInputs[index].inputType = inputType;
    console.log(this.sqlInputs)
    
  }

  // AddToList(index: number){

  //   if ((this.columnsToInclude.length) === index){
  //     this.columnsToInclude.push(this.sqlInputs[index])
  //   }
  //   else {
  //       //*****************ADD SPLICE ***************/
  //   }
  // }

  GetCode(tableName: string){

    this.chatGpt.prompt = "give me code for a simple MySql table named " + tableName + " columns";
    this.sqlInputs.forEach((input)=>{
      this.chatGpt.prompt = this.chatGpt.prompt + " " + input.columnName + " " + input.inputType + " " + input.numberofChars + "insert data" + 'select all'; 
    
      }
    );

    this.chatGptService.GetAnswer(this.chatGpt, 'chatGpturl').subscribe(
      (answerResult) =>{ 
        this.chatGpt.response = answerResult.response.trim();
        changecode(this.chatGpt.response, 'mysql');
        this.columnsToInclude.length = 0;
        
      }
    );

  }

  CopyToClipboard(text: string){

    navigator.clipboard.writeText(text)

  }

}
