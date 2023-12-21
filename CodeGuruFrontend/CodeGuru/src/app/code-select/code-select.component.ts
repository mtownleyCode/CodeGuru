import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../snippets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Snippets } from '../snippets';
import { SnippetStat } from '../snippet-stat';
import { SnippetStatService } from '../snippet-stat.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-code-select',
  templateUrl: './code-select.component.html',
  styleUrls: ['./code-select.component.css']
})




export class CodeSelectComponent implements OnInit{

  distinctSnippets: string[] = []
  typesToChoose: Snippets[] = []  
  snippetsToChoose: Snippets[] = []
  choosenSnippet: Snippets = {} as Snippets
  snippetId: number = -1;
  snippetLanguage: string = "";
  snippet: Snippets= {} as Snippets ;
  

  constructor(private actRoute: ActivatedRoute, 
              private snippetsService: SnippetsService,
              private route: ActivatedRoute,
              private router: Router,
              private snippetStatService: SnippetStatService,
              private userService: UserService) { }


Refresh(){

  console.log("snippetID#" + this.snippetId)

  this.snippetsService.GetSnippets().subscribe(
    (snippetsResult) => { 
      this.snippetsService.snippets = snippetsResult;
      
      this.snippet = this.snippetsService.snippets.find((s) => s.id === this.snippetId)!
      
      this.snippetStatService.GetSnippets(this.userService.currentUser.id).subscribe(
        (snippetStatResults) =>{
          this.snippetStatService.snippetStats = snippetStatResults;
          this.snippetsService.snippets.forEach((snippet) =>{
            let snippetStat = this.snippetStatService.snippetStats.find(ss => ss.snippetId === snippet.id)
            if (snippetStat !== undefined){
              snippet.favorite = true;
            }
            
          })
        }

      )

    }
  );
  
}

  ngOnInit(): void {
    let ip_snippetLanguage = [this.actRoute.snapshot.params['language']]  
    this.snippetLanguage = ip_snippetLanguage.toString()
    this.snippet.language = this.snippetLanguage
    this.snippet.language = this.snippetLanguage
    this.typesToChoose = this.snippetsService.snippets.filter(s => s.language === this.snippetLanguage)
    this.distinctSnippets = 
      this.typesToChoose
      .map((snippet) => snippet.keyWord)
      .filter((snippet, i, arr) => arr.indexOf(snippet) === i);


  }

  SetSnippetsToChoose(type: string){
    this.snippetsToChoose = this.typesToChoose.filter(t => t.keyWord === type)

  }

  SetSnippetId(id: string){
    this.snippetId = parseInt(id);
   
  }

 

}
