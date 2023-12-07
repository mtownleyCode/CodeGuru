import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSnippetComponent } from './view-snippet.component';

describe('ViewSnippetComponent', () => {
  let component: ViewSnippetComponent;
  let fixture: ComponentFixture<ViewSnippetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSnippetComponent]
    });
    fixture = TestBed.createComponent(ViewSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
