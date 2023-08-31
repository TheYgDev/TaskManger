import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8080/users/"
  public logged = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient,public router: Router) { }


  login(username: string, password: string){
    return this.httpClient.post(this.url + "login",{username: username, password: password});
  }

  isLoggedIn() {
    return this.httpClient.post(this.url + 'checkToken', null,{ headers: { 'Authorization': this.getToken() as string} });
  }
  storeToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token")
  }

  logOut() {
    localStorage.removeItem('token');
    this.logged.next(false);
    this.router.navigate(['login/loginForm']);
  }

  delete(id:string){
    return this.httpClient.delete(this.url + id);
  }

  register( user: User){
    return this.httpClient.post(this.url,user);
  }
}
