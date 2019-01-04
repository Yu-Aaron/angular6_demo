import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritydeviceComponent } from './securitydevice.component';

describe('SecuritydeviceComponent', () => {
  let component: SecuritydeviceComponent;
  let fixture: ComponentFixture<SecuritydeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritydeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritydeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
