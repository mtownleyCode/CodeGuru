import { Component, OnInit } from '@angular/core';
import { Snippets } from '../snippets';
import { SnippetsService } from '../snippets.service';
import { ActivatedRoute } from '@angular/router';
import { changecode } from '../../assets/CodeEditor';

@Component({
  selector: 'app-view-snippet',
  templateUrl: './view-snippet.component.html',
  styleUrls: ['./view-snippet.component.css']
})
export class ViewSnippetComponent implements OnInit{

  snippet: Snippets = {} as Snippets;
  snippetId: string = "";

  constructor(private actRoute: ActivatedRoute, private snippetsService: SnippetsService) { }
  
  
  ngOnInit(): void {

    this.snippetsService.GetSnippets().subscribe(
      (snippetsResult) =>{ 
        this.snippetsService.snippets = snippetsResult;
        console.log(this.snippetsService.snippets)
        this.snippet = this.snippetsService.snippets.find((s) => s.id === 10)!

      }
    );

    let ip_snippetId = [this.actRoute.snapshot.params['id']];
    this.snippetId = ip_snippetId.toString()
   

    this.snippet = this.snippetsService.snippets.find((s) => s.id === parseInt(this.snippetId))!

  }

  copyToClipboard(text){
    navigator.clipboard.writeText(text)
  }
 
  // testingeditor(){
  //   console.log('here')
  //   changecode()
  // }
}
