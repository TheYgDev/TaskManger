import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { SocketioService } from '../services/socketio.service';
@Injectable({
  providedIn: 'root',
})
export class isLoggedGuard {
  constructor(public userService: UserService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    let success = false
    this.userService.isLoggedIn().subscribe((data: any) => {
      success = data.sucsess;
      this.userService.logged.next(success);
      return success;
    }, (error: any) => {
      this.router.navigate(['login/loginForm']);
    }) 
   
    return true;
  }
}