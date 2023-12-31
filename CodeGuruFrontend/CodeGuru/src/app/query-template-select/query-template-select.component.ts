import { Component, OnInit, Query } from '@angular/core';
import { Language } from '../language';
import { QueryTemplate } from '../query-template';
import { QueryTemplateService } from '../query-template.service';
import { LanguagesService } from '../languages.service';
import { Router } from '@angular/router';
import { Snippets } from '../snippets';
import { SnippetsService } from '../snippets.service';

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
  queryTemplate: string="";
  snippetLanguage: string = "";
  snippet: Snippets= {} as Snippets ;
  query: Query={} as Query;
  queryTemplateId: number = 0;
  queryTemplateob: QueryTemplate= {} as QueryTemplate;
  navRoute: string = "";

  


  
  constructor(private router: Router, private queryTemplateService: QueryTemplateService, private snippetsService: SnippetsService,
     private languagesService: LanguagesService) 
     { 
      this.queryTemplateService.GetQueryTemplates().subscribe((queryTemplateResult) =>{ this.filteredTemplates=queryTemplateResult})}
 
  Reload() {
    {
      for (let i = 0; i < this.queryTemplateService.queryTemplate.length; i++) {
        const q = this.queryTemplateService.queryTemplate[i];
        if (q.language && q.elementType === this.language && this.filteredTemplates[i].elementType) {          
          break;
        }
      }
    }
  }             

              
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
    this.queryTemplateob.language = language
    this.filteredTemplates = this.queryTemplates.filter(q => q.language === language && q.elementType != "");
  }

  SetTemplate(template: string){
    this.queryTemplateob.elementType = template;
    if ((this.queryTemplateob.elementType === "Form" || this.queryTemplateob.elementType === "Table") && this.queryTemplateob.language != "MYSQL" ){
      this.navRoute = "generic";
    }
    else if (this.queryTemplateob.language === "MYSQL"){
      this.navRoute = "sql"
    }
    else {
      this.navRoute = this.queryTemplateob.elementType;
    }
    console.log(this.navRoute)
  }

  NavigateToCustomTemplate(){

    if (this.queryTemplate === 'Form' || this.queryTemplate === 'Table'){      
      this.router.navigate(['./home/querytemplateselect/genericinputtemplate/', this.queryTemplateob.elementType, this.queryTemplateob.language])
    }

    else if (this.language === 'MySql'){
      this.router.navigate(['./home/querytemplateselect/sql/'])
    }

  }

}
