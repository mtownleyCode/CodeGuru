import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTemplateComponent } from './class-template.component';

describe('ClassTemplateComponent', () => {
  let component: ClassTemplateComponent;
  let fixture: ComponentFixture<ClassTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassTemplateComponent]
    });
    fixture = TestBed.createComponent(ClassTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
