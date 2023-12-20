import { Component, Input, OnInit} from '@angular/core';
import { Snippets } from '../snippets';
import { SnippetsService } from '../snippets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnippetStat } from '../snippet-stat';
import { UserService } from '../user.service';
import { SnippetStatService } from '../snippet-stat.service';
import { User } from '../user';


@Component({
  selector: 'app-view-snippet',
  templateUrl: './view-snippet.component.html',
  styleUrls: ['./view-snippet.component.css']
})
export class ViewSnippetComponent implements OnInit{

  tempParam: string = "";
  snippetId: number = 0;
  @Input()snippet: Snippets = {} as Snippets;
  showEdit: boolean = false;
  editedSnippet: Snippets = {} as Snippets;
  snippetStat: SnippetStat = {} as SnippetStat;
  
constructor(private snippetsService: SnippetsService,
            private route: ActivatedRoute,
            private router: Router,
            private userService: UserService,
            private snippetStatService: SnippetStatService) { }

  refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([], { relativeTo: this.route });
    });
    
}
  

  ngOnInit(): void {
    console.log(this.user.currentUser)
//     let idToUse = [this.actRoute.snapshot.params['id']]
//     this.tempParam = idToUse.toString();
//     this.snippetId = parseInt(this.tempParam)

  }

  RemoveDeleteFavorite(){
    console.log(this.snippetStatService.snippetStats)
    this.snippetStat = this.snippetStatService.snippetStats.find(ss => ss.snippetId === this.snippet.id && ss.userId === this.userService.currentUser.id)!


    if (this.snippetStat !== undefined){
      this.snippetStatService.DeleteSnippetStat(this.snippetStat).subscribe(
        () => {
          console.log(this.snippet.description)
          this.snippet.favorite = false;
          this.snippetStatService.snippetStats.splice(this.snippetStatService.snippetStats.indexOf(this.snippetStat), 1)
        })
    }
    else{
      this.snippetStat = {} as SnippetStat;
      console.log(this.snippetStat.snippetId)
      this.snippetStat.snippetId = this.snippet.id;
      this.snippetStat.userId = this.userService.currentUser.id;
      this.snippetStatService.AddSnippetStat(this.snippetStat).subscribe(
        () => {
          this.snippet.favorite = true;
          this.snippetStatService.snippetStats.push(this.snippetStat)

        } 
      )
    }



  }

  copyToClipboard(text){
    navigator.clipboard.writeText(text)
  }

  deleteSnippet(){
    alert('Deleting this snippet');
    this.snippetsService.DeleteSnippets(this.snippet.id).subscribe();
    this.router.navigate(['home']);
  }  
  
  showEditForm(){
    console.log(this.showEdit);
    this.showEdit = !this.showEdit
  }

  editSnippet(){
    this.snippet.snippetText = this.editedSnippet.snippetText;
    this.snippetsService.EditSnippets(this.snippet.id, this.snippet).subscribe();
    this.router.navigate(['home']);
  }

 
  // testingeditor(){
  //   console.log('here')
  //   changecode()
  // }
}
