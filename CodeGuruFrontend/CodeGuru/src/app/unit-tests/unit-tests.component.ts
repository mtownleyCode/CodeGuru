import { Component } from '@angular/core';
import { Language } from '../language';

@Component({
  selector: 'app-unit-tests',
  templateUrl: './unit-tests.component.html',
  styleUrls: ['./unit-tests.component.css']
})
export class UnitTestsComponent {

  languages: Language[] = [];

  GetLanguageToUse(language: string){

  }
}
