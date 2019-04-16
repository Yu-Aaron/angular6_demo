import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VulComponent } from './vul.component';

describe('VulComponent', () => {
  let component: VulComponent;
  let fixture: ComponentFixture<VulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
