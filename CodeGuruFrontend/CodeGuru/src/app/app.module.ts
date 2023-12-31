import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AddSnippetComponent } from './add-snippet/add-snippet.component';
import { ViewSnippetComponent } from './view-snippet/view-snippet.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LanguagesComponent } from './languages/languages.component';
import { CodeSelectComponent } from './code-select/code-select.component';
import { QueryTemplateSelectComponent } from './query-template-select/query-template-select.component';
import { GenericInputTemplateComponent } from './generic-input-template/generic-input-template.component';
import { UnitTestsComponent } from './unit-tests/unit-tests.component';
import { TranslateComponent } from './translate/translate.component';
import { SqlTemplateComponent } from './sql-template/sql-template.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AuthenticateInterceptorService } from './authenticate-interceptor.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { ClassTemplateComponent } from './class-template/class-template.component';
import { FreeTextComponent } from './free-text/free-text.component';


const routes: Routes = [
  
  {path : 'login', component: LoginScreenComponent},
  {path: 'home', component: HomeComponent,
   //canActivate: [AuthenticationGuard],
   children: [
    {path: 'languages', component: LanguagesComponent},    
    {path: 'codeselect/:language', component: CodeSelectComponent,
      children:[
        {path: 'viewsnippet/:id', component: ViewSnippetComponent},
      ]},      
    {path: 'querytemplateselect', component: QueryTemplateSelectComponent,
      children:[
        {path: 'genericinputtemplate/:template/:language', component: GenericInputTemplateComponent},
        {path: 'sql', component: SqlTemplateComponent}
    ]},
    {path: 'translate', component: TranslateComponent},
    {path : '', redirectTo: 'languages', pathMatch:'full'},
    {path: 'unittests', component: UnitTestsComponent},
    {path: 'addsnippet', component: AddSnippetComponent},
    {path: 'favorites', component: FavoritesComponent},
    {path: 'freetext', component: FreeTextComponent}

   ]},     
  {path : '', redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    AddSnippetComponent,
    ViewSnippetComponent,
    LanguagesComponent,
    CodeSelectComponent,
    QueryTemplateSelectComponent,
    GenericInputTemplateComponent,
    UnitTestsComponent,
    TranslateComponent,
    SqlTemplateComponent,
    LoginScreenComponent,
    SpinnerComponent,
    FavoritesComponent,
    ClassTemplateComponent
    FreeTextComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
              {provide: HTTP_INTERCEPTORS,
               useClass: AuthenticateInterceptorService,
               multi: true}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
