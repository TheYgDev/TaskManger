import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Task from 'src/app/models/taskModule';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent {
  id: string = '';
  task: Task = new Task();
  constructor(
    private activated: ActivatedRoute,
    private ioService: SocketioService
  ) {}
  ngOnInit() {
    this.activated.params.subscribe((params) => {
      this.id = params['id'];
      this.ioService.connectedIO.subscribe((conn: boolean) => {
        if (conn) {
          this.ioService.GetTask(this.id).then((task) => {
            this.task = task;
          });
        }
      });
    });
  }
}
