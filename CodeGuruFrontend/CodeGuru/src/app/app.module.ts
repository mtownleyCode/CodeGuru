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
import { LanguagesComponent } from './languages/languages.component';
import { FormComponent } from './form/form.component';
import { CodeSelectComponent } from './code-select/code-select.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { QueryTemplateSelectComponent } from './query-template-select/query-template-select.component';
import { GenericInputTemplateComponent } from './generic-input-template/generic-input-template.component';
import { UnitTestsComponent } from './unit-tests/unit-tests.component';

const routes: Routes = [
<<<<<<< HEAD
  {path: 'home', component: HomeComponent},
  {path: 'query', component: QueryComponent},
  {path: 'addsnippet', component: AddSnippetComponent},
  {path: "", redirectTo:"home", pathMatch:'full'}
=======
  {path: 'home', component: HomeComponent,
   children: [
    {path: 'languages', component: LanguagesComponent},
    {path: 'codeselect/:language', component: CodeSelectComponent,
      children:[
        {path: 'viewsnippet/:id', component: ViewSnippetComponent}
      ]},
    {path: 'querytemplateselect', component: QueryTemplateSelectComponent,
      children:[
        {path: 'genericinputtemplate/:template/:language', component: GenericInputTemplateComponent}
    ]},
    {path : '', redirectTo: 'languages', pathMatch:'full'}
   ]},
  {path : '', redirectTo: 'home', pathMatch:'full'}
>>>>>>> a9a9306c44ad16892f51b33384610afa7f0ac31e
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    AddSnippetComponent,
    ViewSnippetComponent,
    QueryComponent,
    LanguagesComponent,
    FormComponent,
    CodeSelectComponent,
    CustomFormComponent,
    QueryTemplateSelectComponent,
    GenericInputTemplateComponent,
    UnitTestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)]
   // [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
