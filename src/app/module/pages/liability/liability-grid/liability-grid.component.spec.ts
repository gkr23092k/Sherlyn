import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilityGridComponent } from './liability-grid.component';

describe('LiabilityGridComponent', () => {
  let component: LiabilityGridComponent;
  let fixture: ComponentFixture<LiabilityGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiabilityGridComponent]
    });
    fixture = TestBed.createComponent(LiabilityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
