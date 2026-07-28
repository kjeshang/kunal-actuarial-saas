import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteProbabilityPage } from './discrete-probability-page';

describe('DiscreteProbabilityPage', () => {
  let component: DiscreteProbabilityPage;
  let fixture: ComponentFixture<DiscreteProbabilityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteProbabilityPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscreteProbabilityPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
