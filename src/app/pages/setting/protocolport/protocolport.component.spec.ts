import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolportComponent } from './protocolport.component';

describe('ProtocolportComponent', () => {
  let component: ProtocolportComponent;
  let fixture: ComponentFixture<ProtocolportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
