import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTemplateSelectComponent } from './query-template-select.component';

describe('CustomQuerySelectComponent', () => {
  let component: QueryTemplateSelectComponent;
  let fixture: ComponentFixture<QueryTemplateSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueryTemplateSelectComponent]
    });
    fixture = TestBed.createComponent(QueryTemplateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
