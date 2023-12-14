import { Component, OnInit } from '@angular/core';
import { Language } from '../language';
import { LanguagesService } from '../languages.service';
import { SnippetsService } from '../snippets.service';
import { Snippets } from '../snippets';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit{
  
  languages: Language[] = [];
  test: string[] = [
  'test',
  'test2',
  'test'];

  constructor(private languagesService: LanguagesService, private snippetService: SnippetsService) { }
  
  ngOnInit(): void {
    this.languagesService.GetLanguages().subscribe(
      (languagesResult) =>{ 
        this.languages = languagesResult;
        console.log(this.languages)
      }
    );

    this.snippetService.GetSnippets().subscribe(
      (snippetsResult) =>{ 
        this.snippetService.snippets = snippetsResult;
        console.log(this.snippetService.snippets)
      }
    );

  }

  NavigateTo(){
    
    const distinctThings = this.test.filter(
      (thing, i, arr) => arr.indexOf(thing) === i
    );

  }

  
}
