import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../snippets.service';
import { Snippets } from '../snippets';
import { Snippet } from '../snippet.model';

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.css'],
})
export class AddSnippetComponent implements OnInit {
  snippets: Snippets[] = [];
  newSnippet: Snippets = {} as Snippets;

  constructor(private snippetService: SnippetsService) {}

  ngOnInit(): void {
    this.fetchSnippets();
    this.newSnippet.language = "html";
    this.newSnippet.keyWord = "test";
  }

  fetchSnippets(): void {
    this.snippetService.GetSnippets().subscribe(
      (snippetsResult) => {
        this.snippets = snippetsResult;
        console.log(this.snippets);
      }
    );
  }

  addSnippet(): void {
    this.snippetService.SaveSnippet(this.newSnippet)
      .subscribe(
        (result) => {
          console.log('Snippet added successfully:', result);
          this.snippets.push(result);
        },
        (error) => {
          console.error('Error adding snippet:', error);
        }
      );
  }
}