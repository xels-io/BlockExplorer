import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComP } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComP;
  let fixture: ComponentFixture<ChartComP>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComP ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
