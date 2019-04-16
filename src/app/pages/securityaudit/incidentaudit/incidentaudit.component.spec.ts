import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentauditComponent } from './incidentaudit.component';

describe('IncidentauditComponent', () => {
  let component: IncidentauditComponent;
  let fixture: ComponentFixture<IncidentauditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentauditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
