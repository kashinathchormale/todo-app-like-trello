import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoboardComponent } from './todoboard.component';

describe('TodoboardComponent', () => {
  let component: TodoboardComponent;
  let fixture: ComponentFixture<TodoboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
