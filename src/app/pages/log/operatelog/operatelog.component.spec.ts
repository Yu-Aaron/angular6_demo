import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatelogComponent } from './operatelog.component';

describe('OperatelogComponent', () => {
  let component: OperatelogComponent;
  let fixture: ComponentFixture<OperatelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
