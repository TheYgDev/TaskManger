import { Component } from '@angular/core';
import { Globals } from 'src/app/globals/globals';
import Task from 'src/app/models/taskModule';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  taskList: any;
  filterTaskList: any;
  sortList: any;
  priorityList: any;
  searchKey: string = '';
  isDoneList: any;
  chosenisDone: any = null;
  chosenPriority: any = null;

  constructor(private ioService: SocketioService, private globals: Globals) {
    this.priorityList = [...globals.priorityList];
    this.isDoneList = [...this.globals.isDoneList];
    this.isDoneList.unshift({ value: 0, prop: 'isDone', name: 'Both' });
    this.priorityList.unshift({ value: 0, prop: 'priority', name: 'All' });
  }

  ngOnInit(): void {
    this.ioService.getTaskList().subscribe((tasks) => {
      if (!this.chosenisDone && !this.chosenPriority) {
        this.taskList = tasks;
        this.filterTaskList = this.taskList;
      }
    });
  }
  update(task: Task) {
    if (this.chosenPriority || this.chosenisDone) {
      this.filterTaskList = this.filterTaskList.map((i: Task) => {
        if (i._id === task._id) return task;
        return i;
      });

      this.taskList = this.taskList.map((i: Task) => {
        if (i._id === task._id) return task;
        return i;
      });
    }
    this.ioService.UpdateTask(task);
  }

  filter(prop: any) {
    if (prop.prop === 'isDone') {
      this.chosenisDone = prop;
      if (prop.value === 0) {
        this.chosenisDone = null;
      }
    } else if (prop.prop === 'priority') {
      this.chosenPriority = prop;
      if (prop.value == 0) {
        this.chosenPriority = null;
      }
    }
    this.filterTaskList = this.taskList;

    if (this.chosenisDone) {
      this.filterProp(this.chosenisDone, this.filterTaskList);
    }
    if (this.chosenPriority) {
      this.filterProp(this.chosenPriority, this.filterTaskList);
    }
  }

  filterProp<T>(filter: any, taskList: [] = this.taskList) {
    let property: keyof T = filter.prop;
    this.filterTaskList = taskList.filter((a: any) => {
      if (filter.value === 0 || a[property] === filter.value) {
        return a;
      }
    });
  }

  taskDel(task: Task) {
    if (this.chosenPriority || this.chosenisDone) {
      this.filterTaskList = this.filterTaskList.filter(
        (i: Task) => i._id !== task._id
      );
      this.taskList = this.taskList.filter((i: Task) => i._id !== task._id);
    }
    this.ioService.DeleteTask(task);
  }
}
