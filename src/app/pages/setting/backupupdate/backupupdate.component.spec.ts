import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupupdateComponent } from './backupupdate.component';

describe('BackupupdateComponent', () => {
  let component: BackupupdateComponent;
  let fixture: ComponentFixture<BackupupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
