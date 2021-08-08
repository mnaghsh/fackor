import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionUsersComponent } from './users.component';

describe('MissionUsersComponent', () => {
  let component: MissionUsersComponent;
  let fixture: ComponentFixture<MissionUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
