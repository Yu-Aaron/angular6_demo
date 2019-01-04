import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConfigComponent } from './login-config.component';

describe('LoginConfigComponent', () => {
  let component: LoginConfigComponent;
  let fixture: ComponentFixture<LoginConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
