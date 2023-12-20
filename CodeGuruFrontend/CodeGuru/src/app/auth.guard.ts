import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const AuthenticationGuard: CanActivateFn = (): boolean => {
 
  let userService = inject(UserService)

  console.log(userService.currentUser)
  let isEmpty = Object.keys(userService.currentUser).length === 0 && userService.currentUser.constructor === Object
  if (userService.currentUser === undefined || isEmpty){
    inject(Router).navigate['login'];
    return false;
  }
  return true

};
