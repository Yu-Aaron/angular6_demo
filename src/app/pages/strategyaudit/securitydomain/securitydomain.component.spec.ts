import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritydomainComponent } from './securitydomain.component';

describe('SecuritydomainComponent', () => {
  let component: SecuritydomainComponent;
  let fixture: ComponentFixture<SecuritydomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritydomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritydomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
