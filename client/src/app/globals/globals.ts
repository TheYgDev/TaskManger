import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class Globals{
  
    public priorityList = [
    { value: 1,prop:"priority", name: "Low" },
    { value: 2,prop:"priority" ,name: "Medium" },
    { value: 3,prop:"priority", name: "High" },
    { value: 4,prop:"priority", name: "Important" },
    { value: 5, prop:"priority",name: "Urgent" },
  ];
  public isDoneList = [
    { value: true,prop:"isDone", name: "Completed" },
    { value: false , prop:"isDone",name: "inComplete" } 
  ];
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}