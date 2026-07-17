import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineChart } from './multi-line-chart';

describe('MultiLineChart', () => {
  let component: MultiLineChart;
  let fixture: ComponentFixture<MultiLineChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLineChart],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiLineChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
