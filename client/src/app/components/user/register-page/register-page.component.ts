import { Component, ViewChild  } from '@angular/core';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  @ViewChild('regForm', { static: false }) regForm!: NgForm;
  user = new User();
  submited = false;
  errorMassage = null;

  constructor(public userService: UserService,private router:Router) { }
  
  register() {
    this.submited = true;
    if (this.regForm.valid) {
      this.userService.register(this.user).subscribe((data: any) => {
        let token = data.token;
        this.userService.storeToken(token);
        this.router.navigate(['/']);
      }, (error: any) => {
        this.errorMassage = error.error.error;
       })
    }
  }
}
