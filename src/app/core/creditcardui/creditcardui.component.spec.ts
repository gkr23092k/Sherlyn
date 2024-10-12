import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcarduiComponent } from './creditcardui.component';

describe('CreditcarduiComponent', () => {
  let component: CreditcarduiComponent;
  let fixture: ComponentFixture<CreditcarduiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditcarduiComponent]
    });
    fixture = TestBed.createComponent(CreditcarduiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
