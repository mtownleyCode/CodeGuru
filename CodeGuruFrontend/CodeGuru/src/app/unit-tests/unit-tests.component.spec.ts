import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTestsComponent } from './unit-tests.component';

describe('UnitTestsComponent', () => {
  let component: UnitTestsComponent;
  let fixture: ComponentFixture<UnitTestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitTestsComponent]
    });
    fixture = TestBed.createComponent(UnitTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
