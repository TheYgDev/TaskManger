import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Globals } from 'src/app/globals/globals';
import Task from 'src/app/models/taskModule';

type PriorityColors = { [key: number]: string };

@Component({
  selector: 'tr[app-task]',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent  {
  @Input() task: Task = new Task();
  @Output() taskChanged = new EventEmitter<any>();
  @Output() taskDeleted = new EventEmitter<any>();
  priority: any
  isDone:any
  priorityList: any;
  isDoneList: any;
  isDoneDesign="form-control "
  priorityDesign = "form-control "
  priorityColors: PriorityColors = { 3: "bg-primary", 4: "bg-warning", 5: "bg-danger" };
  
  constructor(private globals: Globals) {
    this.priorityList = [...this.globals.priorityList];
    this.isDoneList = [...this.globals.isDoneList];
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && changes['task'].firstChange) {
      this.priority = this.priorityList.find((p:any) => this.task.priority == p.value);
      this.isDone = this.isDoneList.find((p: any) => this.task.isDone == p.value);   
    }
    if (changes['task']) {
      this.isDoneDesign = this.task.isDone ? "form-control bg-success bg-gradient text-white" : "form-control "
      this.priorityDesign = this.task.priority > 2 ? `form-control ${this.priorityColors[this.task.priority]} bg-gradient text-white` : "form-control "
    }
  }

  private triggerNgOnChanges() {
    const changes: SimpleChanges = {
      task: new SimpleChange(this.task, this.task, false)
    };
    this.ngOnChanges(changes);
  }

  deleteTask() {
    this.taskDeleted.emit(this.task);
  }

  changeDone(isDone: any) {
    this.task.isDone = isDone.value;
    this.taskChanged.emit(this.task);
    this.triggerNgOnChanges();
  }
  changePriority(priority: any) {
    this.task.priority = priority.value;
    this.taskChanged.emit(this.task);
    this.triggerNgOnChanges();
  }
}
