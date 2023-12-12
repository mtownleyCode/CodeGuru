import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSelectComponent } from './code-select.component';

describe('CodeSelectComponent', () => {
  let component: CodeSelectComponent;
  let fixture: ComponentFixture<CodeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeSelectComponent]
    });
    fixture = TestBed.createComponent(CodeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
