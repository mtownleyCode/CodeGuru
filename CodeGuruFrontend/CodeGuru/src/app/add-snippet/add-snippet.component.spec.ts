import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSnippetComponent } from './add-snippet.component';

describe('AddSnippetComponent', () => {
  let component: AddSnippetComponent;
  let fixture: ComponentFixture<AddSnippetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSnippetComponent]
    });
    fixture = TestBed.createComponent(AddSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
