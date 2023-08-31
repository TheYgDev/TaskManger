import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  logged:boolean = false;
  constructor(private userService:UserService) {
    this.userService.logged.subscribe(logged => {
      this.logged = logged;
    })
  }
}
