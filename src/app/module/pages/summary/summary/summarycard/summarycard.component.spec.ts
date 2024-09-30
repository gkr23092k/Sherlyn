import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarycardComponent } from './summarycard.component';

describe('SummarycardComponent', () => {
  let component: SummarycardComponent;
  let fixture: ComponentFixture<SummarycardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummarycardComponent]
    });
    fixture = TestBed.createComponent(SummarycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
