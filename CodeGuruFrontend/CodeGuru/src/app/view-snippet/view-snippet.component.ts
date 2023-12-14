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
  tempParam: string = "";
  snippetId: number = 0;

  constructor(private actRoute: ActivatedRoute, private snippetsService: SnippetsService) { }
  
  
  ngOnInit(): void {

    let idToUse = [this.actRoute.snapshot.params['id']]
    this.tempParam = idToUse.toString();
    this.snippetId = parseInt(this.tempParam)

    console.log("here" + this.snippetId)


    this.snippetsService.GetSnippets().subscribe(
      (snippetsResult) =>{ 
        this.snippetsService.snippets = snippetsResult;
        console.log(this.snippetsService.snippets)
        this.snippet = this.snippetsService.snippets.find((s) => s.id === this.snippetId)!

      }
    );

  }

  copyToClipboard(text){
    navigator.clipboard.writeText(text)
  }
 
  // testingeditor(){
  //   console.log('here')
  //   changecode()
  // }
}
