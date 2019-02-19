import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecincidentDetailsComponent } from './secincident-details.component';

describe('SecincidentDetailsComponent', () => {
  let component: SecincidentDetailsComponent;
  let fixture: ComponentFixture<SecincidentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecincidentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecincidentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
