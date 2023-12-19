import { Component, Input, OnInit} from '@angular/core';
import { Snippets } from '../snippets';
import { SnippetsService } from '../snippets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
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
  
  
constructor(private actRoute: ActivatedRoute, private snippetsService: SnippetsService, 
  private route: ActivatedRoute, private router: Router, private user: UserService) { }
  setUser: User = this.user.currentUser;
  

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

//     console.log("here" + this.snippetId)
// console.log(this.snippet)

//     this.snippetsService.GetSnippets().subscribe(
//       (snippetsResult) =>{ 
//         this.snippetsService.snippets = snippetsResult;
//         console.log(this.snippetsService.snippets)
//         this.snippet = this.snippetsService.snippets.find((s) => s.id === this.snippetId)!

//       }
//     );

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
