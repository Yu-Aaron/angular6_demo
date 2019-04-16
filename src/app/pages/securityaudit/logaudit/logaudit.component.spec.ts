import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogauditComponent } from './logaudit.component';

describe('LogauditComponent', () => {
  let component: LogauditComponent;
  let fixture: ComponentFixture<LogauditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogauditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
