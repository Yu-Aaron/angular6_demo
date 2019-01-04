import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworksessionComponent } from './networksession.component';

describe('NetworksessionComponent', () => {
  let component: NetworksessionComponent;
  let fixture: ComponentFixture<NetworksessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworksessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworksessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
