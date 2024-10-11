import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdowndonutComponent } from './breakdowndonut.component';

describe('BreakdowndonutComponent', () => {
  let component: BreakdowndonutComponent;
  let fixture: ComponentFixture<BreakdowndonutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreakdowndonutComponent]
    });
    fixture = TestBed.createComponent(BreakdowndonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
