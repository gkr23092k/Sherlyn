import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomrangeComponent } from './customrange.component';

describe('CustomrangeComponent', () => {
  let component: CustomrangeComponent;
  let fixture: ComponentFixture<CustomrangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomrangeComponent]
    });
    fixture = TestBed.createComponent(CustomrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
