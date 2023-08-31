import { Component } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = '';
  constructor(
    private userService: UserService,
    private ioService: SocketioService
  ) {}

  ngOnInit(): void {
    this.userService.logged.subscribe((isLogged) => {
      if (isLogged) {
        this.menuType = 'logged';
        this.ioService.setupSocketConnection(this.userService.getToken()!);
      } else {
        this.menuType = 'default';
        this.ioService.disconnectSocket();
      }
    });
  }

  logOut() {
    this.userService.logOut();
  }
}
