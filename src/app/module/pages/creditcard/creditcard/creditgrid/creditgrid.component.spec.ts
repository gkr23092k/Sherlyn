import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditgridComponent } from './creditgrid.component';

describe('CreditgridComponent', () => {
  let component: CreditgridComponent;
  let fixture: ComponentFixture<CreditgridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditgridComponent]
    });
    fixture = TestBed.createComponent(CreditgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
