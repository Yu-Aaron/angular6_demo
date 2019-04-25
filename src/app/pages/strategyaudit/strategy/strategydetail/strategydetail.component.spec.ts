import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategydetailComponent } from './strategydetail.component';

describe('StrategydetailComponent', () => {
  let component: StrategydetailComponent;
  let fixture: ComponentFixture<StrategydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
