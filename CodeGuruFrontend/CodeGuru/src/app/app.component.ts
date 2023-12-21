import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IdleWatchService } from './idle-watch.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CodeGuru';
  

}
