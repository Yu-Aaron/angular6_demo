import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecincidentComponent } from './secincident.component';

describe('SecincidentComponent', () => {
  let component: SecincidentComponent;
  let fixture: ComponentFixture<SecincidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecincidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecincidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
