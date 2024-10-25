import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllocationformComponent } from './add-allocationform.component';

describe('AddAllocationformComponent', () => {
  let component: AddAllocationformComponent;
  let fixture: ComponentFixture<AddAllocationformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAllocationformComponent]
    });
    fixture = TestBed.createComponent(AddAllocationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
