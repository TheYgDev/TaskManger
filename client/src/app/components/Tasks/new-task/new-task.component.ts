import { Component, Input ,SimpleChanges} from '@angular/core';
import { Globals } from 'src/app/globals/globals';
import Task from 'src/app/models/taskModule';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  @Input() task: Task = new Task();
  formTitle: String = "";
  onEdit: boolean = true;
  priortyList:any
  constructor(private ioService: SocketioService,private globals:Globals) {
    this.priortyList = [...this.globals.priorityList]
  }
  ngOnInit(): void {
      this.onEdit = false;
      this.formTitle = "Add New Task";
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && !changes['task'].firstChange) {
      this.formTitle = `Edit Task: ${this.task.title}`;   
      this.onEdit = true;
    }
  }

  submit() {
    if (this.onEdit) {
      this.ioService.UpdateTask(this.task);
    }
    else {
      this.ioService.AddTask(this.task);
    }
  }
}
