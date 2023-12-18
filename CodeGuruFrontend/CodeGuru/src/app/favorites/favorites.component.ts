import { Component, OnInit } from '@angular/core';
import { SnippetStatService } from '../snippet-stat.service';
import { UserService } from '../user.service';
import { Snippets } from '../snippets';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  snippetFavorites: Snippets[] = [];

  constructor(private snippetStatService: SnippetStatService,
              private userService: UserService){}
    
  ngOnInit(): void {
    this.snippetStatService.getSnippetStats(this.userService.currentUser.id).subscribe(
      (snippetResults) => {
        console.log('favorites' + this.userService.currentUser.id)
        this.snippetFavorites = snippetResults;
        console.log(this.snippetFavorites)
      })  
  }
}
