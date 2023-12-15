import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../snippets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Snippets } from '../snippets';

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

  constructor(private actRoute: ActivatedRoute, private snippetsService: SnippetsService, private route: ActivatedRoute, private router: Router) { }

//   refreshPage() {
//     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//         this.router.navigate([], { relativeTo: this.route });
//     });
// }
  
Refresh(){

  console.log("snippetID#" + this.snippetId)

  this.snippetsService.GetSnippets().subscribe(
    (snippetsResult) =>{ 
      this.snippetsService.snippets = snippetsResult;
      console.log(this.snippetsService.snippets)
      this.snippet = this.snippetsService.snippets.find((s) => s.id === this.snippetId)!
      console.log(this.snippet)
    }
  );
}

  ngOnInit(): void {
    let ip_snippetLanguage = [this.actRoute.snapshot.params['language']]  
    this.snippetLanguage = ip_snippetLanguage.toString()
    this.snippet.language = this.snippetLanguage
    this.typesToChoose = this.snippetsService.snippets.filter(s => s.language === this.snippetLanguage)
console.log(this.snippet)
    this.distinctSnippets = 
      this.typesToChoose
      .map((snippet) => snippet.keyWord)
      .filter((snippet, i, arr) => arr.indexOf(snippet) === i);


  }

  SetSnippetsToChoose(type: string){
    this.snippetsToChoose = this.typesToChoose.filter(t => t.keyWord === type)

  }

  SetSnippetId(id: string){
    console.log('select ' + id)
    this.snippetId = parseInt(id);
   
  }

}
