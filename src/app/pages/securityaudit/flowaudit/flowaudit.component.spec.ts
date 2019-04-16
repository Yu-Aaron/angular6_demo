import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowauditComponent } from './flowaudit.component';

describe('FlowauditComponent', () => {
  let component: FlowauditComponent;
  let fixture: ComponentFixture<FlowauditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowauditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
