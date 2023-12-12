import { Component, OnInit } from '@angular/core';
import { Language } from '../language';
import { QueryTemplate } from '../query-template';
import { QueryTemplateService } from '../query-template.service';
import { LanguagesService } from '../languages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query-template-select',
  templateUrl: './query-template-select.component.html',
  styleUrls: ['./query-template-select.component.css']
})
export class QueryTemplateSelectComponent implements OnInit{

  languages: Language[] = [];
  queryTemplates: QueryTemplate[] = [];
  filteredTemplates: QueryTemplate[] = [];
  language: string = "";
  queryTemplate: string = "";

  constructor(private router: Router,
              private queryTemplateService: QueryTemplateService, 
              private languagesService: LanguagesService) { }
  
  
  ngOnInit(): void {
    this.queryTemplateService.GetQueryTemplates().subscribe(
      (queryTemplatesResult) =>{ 
        this.queryTemplates = queryTemplatesResult;
        
      }
    );

    this.languagesService.GetLanguages().subscribe(
      (languagesResult) =>{ 
        this.languages = languagesResult;
      }
    );

  }

  SetLanguage(language: string){
    this.language = language;
    this.filteredTemplates = this.queryTemplates.filter(q => q.language === language);

  }

  SetTemplate(template: string){
    this.queryTemplate = template;

  }

  NavigateToCustomTemplate(){
    if (this.queryTemplate === 'Form' || this.queryTemplate === 'Table'){      
      this.router.navigate(['./home/querytemplateselect/genericinputtemplate/', this.queryTemplate, this.language])
      
    }

  }

}
