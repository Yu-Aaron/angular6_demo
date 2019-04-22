import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaindetailComponent } from './domaindetail.component';

describe('DomaindetailComponent', () => {
  let component: DomaindetailComponent;
  let fixture: ComponentFixture<DomaindetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomaindetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
