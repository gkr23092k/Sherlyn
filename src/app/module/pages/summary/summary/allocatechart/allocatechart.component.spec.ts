import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatechartComponent } from './allocatechart.component';

describe('AllocatechartComponent', () => {
  let component: AllocatechartComponent;
  let fixture: ComponentFixture<AllocatechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllocatechartComponent]
    });
    fixture = TestBed.createComponent(AllocatechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
