import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorydeviceComponent } from './factorydevice.component';

describe('FactorydeviceComponent', () => {
  let component: FactorydeviceComponent;
  let fixture: ComponentFixture<FactorydeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorydeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorydeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
