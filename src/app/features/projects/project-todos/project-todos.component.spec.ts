import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTodosComponent } from './project-todos.component';

describe('ProjectTodosComponent', () => {
  let component: ProjectTodosComponent;
  let fixture: ComponentFixture<ProjectTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
