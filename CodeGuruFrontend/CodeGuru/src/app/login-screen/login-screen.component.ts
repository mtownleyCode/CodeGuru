declare var google: any;

import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Secret } from '../Secret';
import { LoginCredentials } from '../login-credentials';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit{

  loginCredentials: LoginCredentials = {} as LoginCredentials;

  constructor(private userService: UserService, 
              private router: Router,
              private authService: AuthService,
              private ngZone:NgZone) { }

  ngOnInit(): void {
    let secret: Secret = new Secret();

    google.accounts.id.initialize({
      client_id: secret.googleKey,
      callback: (resp: any)=>{
        this.handleLogin(resp)
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      shape: 'rectangle',
      size: 'large',
      width: 350

    })   

  }

  handleLogin(response: any){
    if (response){

      const payload = this.decodeToken(response.credential)     
      sessionStorage.setItem('access_token', payload.credential);
      this.loginCredentials.email = payload.email
      this.loginCredentials.password = 'google'

      this.userService.GetUserFromLoginInformation(this.loginCredentials).subscribe(
         (userResponse) => {

            if (userResponse === null){

              this.userService.currentUser.firstName = payload.given_name;
              this.userService.currentUser.lastName = payload.family_name;
              this.userService.currentUser.email = payload.email;
              this.userService.currentUser.password = 'google';
              this.userService.currentUser.userRole = 'user';
              this.userService.currentUser.username = '';

              this.authService.Register(this.userService.currentUser).subscribe(
                (registerResponse) => {
                  
                  if (registerResponse === null){
                    console.log("User already has token.")                    
                    console.log(this.userService.currentUser)
                  };
                  
                }
              );
            }

            else{
              this.userService.currentUser = userResponse;
            
            }
           
            this.ngZone.run(() => this.navigateToHome());

          }
         
      ) 

    }
    
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));    
  }


  Login(){       

    console.log(this.loginCredentials)
    this.authService.Login(this.loginCredentials).subscribe(
      (loginResult)=>{
          console.log(loginResult)
          sessionStorage.setItem('access_token', loginResult.token);
          //this.userInformationService.currentUser = userResult;
          // console.log(userResult)
          // this.router.navigate(['/home', 'post'])

       } //,

      // (error) => {
      //   console.log(error.error)
      //   console.log("negative ghost rider")

      // } 



    )
    
  }

  navigateToHome(){
    
    this.router.navigate(['home']);
  
  }

}




  
  