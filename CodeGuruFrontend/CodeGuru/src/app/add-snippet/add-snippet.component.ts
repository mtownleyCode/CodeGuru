import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../snippets.service';
import { Snippets } from '../snippets';

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.css']
})
export class AddSnippetComponent implements OnInit{

  snippets: Snippets[] = [];
  test: string = "";
  constructor(private snippetService: SnippetsService) { }
  ngOnInit(): void {
    this.snippetService.GetSnippets().subscribe(
      (snippetsResult) =>{ 
        this.snippets = snippetsResult;
        console.log(this.snippets)
      }
    );

  this.test = "<form action=\"\">\r\n    <label for=\"fname\">First name:</label><br>\r\n    <input type=\"text\" id=\"fname\" name=\"fname\"><br>\r\n    <label for=\"lname\">Last name:</label><br>\r\n    <input type=\"text\" id=\"lname\" name=\"lname\">\r\n    <input type=\"submit\" value=\"Submit\">\r\n </form>"
  //this.test = this.test.replace("\r\n", "<br>")
  console.log(this.test)
  }

}
