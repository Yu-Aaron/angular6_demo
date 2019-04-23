import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningCreateComponent } from './learning-create.component';

describe('LearningCreateComponent', () => {
  let component: LearningCreateComponent;
  let fixture: ComponentFixture<LearningCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
