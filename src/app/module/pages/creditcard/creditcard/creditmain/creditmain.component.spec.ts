import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditmainComponent } from './creditmain.component';

describe('CreditmainComponent', () => {
  let component: CreditmainComponent;
  let fixture: ComponentFixture<CreditmainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditmainComponent]
    });
    fixture = TestBed.createComponent(CreditmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
