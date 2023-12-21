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
      width: 150


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
                  };
                  
                }
              );
            }

            else{
              this.userService.currentUser = userResponse;
              this.userService.currentUser.token = response.credential
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
   
    this.authService.Login(this.loginCredentials).subscribe(
      (loginResult)=>{
                   
           this.userService.currentUser = loginResult;
           this.ngZone.run(() => this.navigateToHome())

       },

      (error) => {
        if (error.status === 400)
          alert("Incorrect Username or Password.")
        else
          alert("Something went wrong. Please try again.")
        this.loginCredentials.email = "";
        this.loginCredentials.password = "";
      } 

    )
    
  }

  navigateToHome(){
    
    this.router.navigate(['home']);
  
  }

}




  
  