import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLineComponent } from './bar-line.component';

describe('BarLineComponent', () => {
  let component: BarLineComponent;
  let fixture: ComponentFixture<BarLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarLineComponent]
    });
    fixture = TestBed.createComponent(BarLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
