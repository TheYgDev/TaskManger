import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private url = "http://localhost:8080/tasks/"

  constructor(private httpClient: HttpClient,public router: Router,private userService:UserService) { }

  getTask(id:string) { 
    return this.httpClient.get(this.url + id, {
      headers: {
        'Authorization': this.userService.getToken() as string
      }
    });
  }
}
