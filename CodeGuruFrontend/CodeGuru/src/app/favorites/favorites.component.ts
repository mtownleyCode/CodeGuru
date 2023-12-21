import { Component, OnInit } from '@angular/core';
import { SnippetStatService } from '../snippet-stat.service';
import { UserService } from '../user.service';
import { Snippets } from '../snippets';
import { SnippetStat } from '../snippet-stat';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  snippetFavorites: Snippets[] = [];
  favoritesToChoose: Snippets[] = [];
  distinctSnippets: string[] = [];
  snippetStats: SnippetStat[] = [];
  currentSnippet: Snippets = {} as Snippets;
  currentSnippetStat: SnippetStat = {} as SnippetStat;

  constructor(private snippetStatService: SnippetStatService,
              private userService: UserService){}
    
  ngOnInit(): void {

    this.currentSnippet.description = "";

    this.snippetStatService.getFavoriteSnippets(this.userService.currentUser.id).subscribe(
      (snippetResults) => {
        this.snippetFavorites = snippetResults;
        
        this.distinctSnippets = 
          this.snippetFavorites
            .map((snippet) => snippet.language)
            .filter((snippet, i, arr) => arr.indexOf(snippet) === i);

    })  

    this.snippetStatService.GetSnippets(this.userService.currentUser.id).subscribe(
      (snippetStatResults) => {
        this.snippetStats = snippetStatResults;
      }

    )

  }

  SetFavoritesToChoose(type: string){
    this.favoritesToChoose = this.snippetFavorites.filter(t => t.language === type)

  }

  GetCode(snippetIndex: string){
    console.log(snippetIndex)
    if (snippetIndex === "Select Snippet"){
     
    }
    this.currentSnippet = this.favoritesToChoose.find(f => f.id === parseInt(snippetIndex))!

  }

  DeleteFavorite(){

    this.currentSnippetStat = this.snippetStats.find(ss => ss.snippetId === this.currentSnippet.id)!

    this.snippetStatService.DeleteSnippetStat(this.currentSnippetStat).subscribe(
      () => {
        this.currentSnippet.description = "";
        this.currentSnippet.snippetText = "";        
        this.ngOnInit();

      }
      
    )

  }

  CopyToClipboard(text: string){
    navigator.clipboard.writeText(text)

  }

}
