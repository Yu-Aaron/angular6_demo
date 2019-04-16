import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolauditComponent } from './protocolaudit.component';

describe('ProtocolauditComponent', () => {
  let component: ProtocolauditComponent;
  let fixture: ComponentFixture<ProtocolauditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolauditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
