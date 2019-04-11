import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyitemComponent } from './policyitem.component';

describe('PolicyitemComponent', () => {
  let component: PolicyitemComponent;
  let fixture: ComponentFixture<PolicyitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
