import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDropDownComponent } from './edit-drop-down.component';

describe('EditDropDownComponent', () => {
  let component: EditDropDownComponent;
  let fixture: ComponentFixture<EditDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDropDownComponent]
    });
    fixture = TestBed.createComponent(EditDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
