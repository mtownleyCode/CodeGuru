import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AddSnippetComponent } from './add-snippet/add-snippet.component';
import { ViewSnippetComponent } from './view-snippet/view-snippet.component';
import { QueryComponent } from './query/query.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'query', component: QueryComponent},
  {path: 'addsnippet', component: AddSnippetComponent},
  {path: "", redirectTo:"home", pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    AddSnippetComponent,
    ViewSnippetComponent,
    QueryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)]

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
