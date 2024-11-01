import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilityMainComponent } from './liability-main.component';

describe('LiabilityMainComponent', () => {
  let component: LiabilityMainComponent;
  let fixture: ComponentFixture<LiabilityMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiabilityMainComponent]
    });
    fixture = TestBed.createComponent(LiabilityMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
