import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlTemplateComponent } from './sql-template.component';

describe('SqlTemplateComponent', () => {
  let component: SqlTemplateComponent;
  let fixture: ComponentFixture<SqlTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SqlTemplateComponent]
    });
    fixture = TestBed.createComponent(SqlTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
