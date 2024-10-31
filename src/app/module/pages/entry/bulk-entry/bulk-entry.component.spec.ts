import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEntryComponent } from './bulk-entry.component';

describe('BulkEntryComponent', () => {
  let component: BulkEntryComponent;
  let fixture: ComponentFixture<BulkEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkEntryComponent]
    });
    fixture = TestBed.createComponent(BulkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
