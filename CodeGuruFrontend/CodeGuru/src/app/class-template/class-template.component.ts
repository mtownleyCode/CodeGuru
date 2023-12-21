import { Component, Input } from '@angular/core';
import { QueryTemplate } from '../query-template';
import { chatGpt } from '../chatGpt';
import { ChatGPTService } from '../chat-gpt.service';

interface Property{
  name: string;
  dataType: string;
}

@Component({
  selector: 'app-class-template',
  templateUrl: './class-template.component.html',
  styleUrls: ['./class-template.component.css']
})
export class ClassTemplateComponent {
  @Input() queryTemplateChild: QueryTemplate = {} as QueryTemplate;
  
  chatGpt: chatGpt = {} as chatGpt;
  properties: Property[] = [];
  className: string = '';
  selectedLanguage: string = '';

  constructor(private chatGptService: ChatGPTService) {}

  addProperty(): void {
    if (this.properties.length < 10) {
      this.properties.push({ name: '', dataType: '' });
    }
    console.log("add")
    console.log(this.properties)
  }

  removeProperty(index: number): void {
    this.properties.splice(index, 1);
    console.log("remove")
    console.log(this.properties)
  }

  generateCode(): void {

    let codeTemplate = `class ${this.className} {\n`;
    for (let i = 0; i < this.properties.length; i++) {
      codeTemplate += `  ${this.properties[i].name}: ${this.properties[i].dataType};\n`;    
    }
    codeTemplate += `}\n`;
    this.chatGpt.prompt = "";
    this.chatGpt.prompt = `Generate code for ${this.queryTemplateChild.language} class:\n${codeTemplate}`;    this.properties.forEach((prop, index) => {
      this.chatGpt.prompt += ` ${prop.name}: ${prop.dataType};`;
    });

    this.chatGptService.GetAnswer(this.chatGpt, 'chatGpturl').subscribe(
      (answerResult) => {
        this.chatGpt.response = answerResult.response;

      },
      (error) => {
        console.error('Error getting ChatGPT response:', error);
      }
    );
  }
}
