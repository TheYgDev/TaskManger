import { Component, EventEmitter, Input, Output ,SimpleChanges} from '@angular/core';


@Component({
  selector: 'edit-drop-down',
  templateUrl: './edit-drop-down.component.html',
  styleUrls: ['./edit-drop-down.component.css']
})
export class EditDropDownComponent {
  @Output() selectedValue = new EventEmitter<any>();
  @Input() selected: any;
  @Input() design: string="badge bg-dark text-white rounded h-100 w-100 text-left";
  @Input() list: any[] = [];
  defualt: string = "";
  
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['selected'] && !changes['selected'].firstChange) {
  //     this.onChange();
  //   }
  // }
  onChange() {  
    this.selectedValue.emit(this.selected);
  }
}
