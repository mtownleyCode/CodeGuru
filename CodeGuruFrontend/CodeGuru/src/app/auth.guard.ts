import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const AuthenticationGuard: CanActivateFn = (route, state) => {
  console.log('authgaurd')
  
  let userService = inject(UserService)

  if (userService.currentUser.firstName != "")
    return inject(Router).createUrlTree(['/']);
  else return inject(Router).navigate(["home"])

};
