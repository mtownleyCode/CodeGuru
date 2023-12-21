import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../snippets.service';
import { Snippets } from '../snippets';
import { Router } from '@angular/router';
import { LanguagesService } from '../languages.service';
import { Language } from '../language';

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.css'],
})
export class AddSnippetComponent implements OnInit {
  snippets: Snippets[] = [];
  newSnippet: Snippets = {} as Snippets;
  languages: Language[] = [];
  selectedLanguage: string = '';
  keywordOptions: string[] = [];
  constructor(private snippetService: SnippetsService, private languagesService: LanguagesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSnippets();
    this.fetchLanguages();
  }

  fetchSnippets(): void {
    this.snippetService.GetSnippets().subscribe(
      (snippetsResult) => {
        this.snippets = snippetsResult;
      }
    );
  }

  fetchLanguages(): void {
    this.languagesService.GetLanguages().subscribe(
      (languagesResult) => {
        this.languages = languagesResult;
        console.log(this.languages);
      }
    );
  }

  addSnippet(): void { 
    this.snippetService.SaveSnippet(this.newSnippet)
      .subscribe(
        (result) => {
          this.snippets.push(result);
          this.router.navigate(['home']);
        },
        (error) => {
          alert(error);
        }
      );
  }

  updateKeywordOptions(): void {
    if (this.newSnippet.language === 'HTML') {
      this.keywordOptions = ['Form', 'Table', 'Links', 'Lists'];
    } else if (this.newSnippet.language === 'JavaScript') {
      this.keywordOptions = ['Edit HTML content'];
    }else if (this.newSnippet.language === 'C#') {
      this.keywordOptions = ['For Loops', 'Nested Loops'];
    }else if (this.newSnippet.language === 'SQL') {
      this.keywordOptions = ['Creating', 'Show Table', 'Primary Key', 'Foreign Key'];
    } else if (this.newSnippet.language === 'Python') {
      this.keywordOptions = ['Statements', 'Variables', 'Variable Type', 'Conditions'];
    }else {
      this.keywordOptions = []; //Reset options for other languages
    }
  }
}