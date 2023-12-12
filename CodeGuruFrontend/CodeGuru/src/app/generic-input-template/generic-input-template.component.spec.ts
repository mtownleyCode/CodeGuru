import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputTemplateComponent } from './generic-input-template.component';

describe('GenericInputTemplateComponent', () => {
  let component: GenericInputTemplateComponent;
  let fixture: ComponentFixture<GenericInputTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericInputTemplateComponent]
    });
    fixture = TestBed.createComponent(GenericInputTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
