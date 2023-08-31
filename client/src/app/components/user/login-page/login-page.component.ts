import { Component, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  user = { username: "", password: "" }
  incorrect = false;
  invalid = false;
  submited = false;
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;

  constructor(private userService: UserService,private router:Router) { 

  }

  login() {
    this.submited = true;
    this.incorrect = false;
    this.invalid = false;
    if (this.loginForm.valid) {
      this.userService.login(this.user.username, this.user.password).subscribe((data: any) => {
        let token = data.user.token;
        this.incorrect = false;
        this.userService.storeToken(token);
        this.router.navigate(['/']);

      },
        (error: any) => {
          if (error.status === 401) {
            this.incorrect = true;
          }
          else
            this.invalid = true;
        })
    }
  }
  

}
