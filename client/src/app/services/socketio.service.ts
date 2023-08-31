import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import Task from '../models/taskModule';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private taskItemList: any = [];
  public TaskList = new BehaviorSubject<any>([]);
  public connectedIO = new BehaviorSubject<boolean>(false);
  private url = 'http://localhost:8080';
  socket = io(this.url);

  constructor() { }

  setupSocketConnection(token: string) {
    if (!this.socket.connected) {
      this.socket = io(this.url, {
        query: { token },
      });
      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket.connected);
        this.onGetTasks();
        this.onAddTask();
        this.onUpdateTask();
        this.onDeleteTask();
        this.GetTasks();
        this.connectedIO.next(true);
      });
    }
  }

  disconnectSocket() {
    if (this.socket.connected) {
      console.log('disconnected');
      this.socket.disconnect();
      this.connectedIO.next(false);
    }
  }
  private GetTasks() {
    if (this.socket.connected) { 
      this.socket.emit('gettasks');
    }
  }

  onGetTasks() {
    if (this.socket.connected) {
      this.socket.on('getTasks', (tasks: Task[]) => {
        this.taskItemList = tasks;
        this.TaskList.next(this.taskItemList);
      });
    }
  }
  async GetTask(id: string): Promise<Task> {
    return new Promise((resolve) => {
      if (this.socket.connected) {
        console.log("get Task Connected");
        this.socket.emit('gettask', id);
        this.socket.on('getTask', (task: Task) => {
          resolve(task);
        });
      } else {
        resolve(new Task());
        console.log("get Task Fail",this.socket.connected);
      }
    });
  }



  AddTask(task: Task) {
    if (this.socket.connected) {
      console.log("emitted");
      this.socket.emit('addtask', task);
    }
  }

  private onAddTask() {
    if (this.socket.connected)
      this.socket.on('addTask', (task: Task) => {
        console.log(task,"this");
        if (task) {
          this.taskItemList.push(task);
          this.TaskList.next(this.taskItemList);
        }
      });
  }

  UpdateTask(task: Task) {
    if (this.socket.connected) this.socket.emit('updatetask', task);
  }

  private onUpdateTask() {
    if (this.socket.connected)
      this.socket.on('updateTask', (task: Task) => {
        if (task) {
          let index = this.taskItemList.findIndex(
            (i: any) => i._id === task._id
          );
          this.taskItemList[index] = task;
          this.TaskList.next(this.taskItemList);
          console.log('got here');
          console.log(this.TaskList);
        }
      });
  }

  DeleteTask(task: Task) {
    if (this.socket.connected) this.socket.emit('deletetask', task._id);
  }

  private onDeleteTask() {
    if (this.socket.connected)
      this.socket.on('deleteTask', (task: Task) => {
        console.log(task);
        if (task) {
          console.log("hey");
          this.taskItemList = this.taskItemList.filter((i: Task) => i._id !== task._id);
          this.TaskList.next(this.taskItemList);
        }
      });
  }



  getTaskList() {
    return this.TaskList.asObservable();
  }
}
