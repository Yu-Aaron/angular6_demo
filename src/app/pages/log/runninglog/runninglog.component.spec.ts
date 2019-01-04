import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunninglogComponent } from './runninglog.component';

describe('RunninglogComponent', () => {
  let component: RunninglogComponent;
  let fixture: ComponentFixture<RunninglogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunninglogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunninglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
