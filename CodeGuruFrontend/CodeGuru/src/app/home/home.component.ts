import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IdleWatchService } from '../idle-watch.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  idleWatchService = inject(IdleWatchService)
  userService = inject(UserService)
  routing = inject(Router);
  private idleSubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.idleSubscription = this.idleWatchService.idleState.subscribe(
      (isIdle) => {
        if (isIdle){
          //console.log('user is idle')
          this.userService.currentUser = {} as User
          alert("You have been logged out.")
          console.log(this.userService.currentUser.email)
          this.routing.navigate(['/'])
        }
        else{
          // console.log('user is active')
        }

      })
  }

  ngOnDestroy(): void {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }

  onUserAction(){    
    this.idleWatchService.resetTimer();
  }

}
