import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTreeComponent } from './org-for-fight.component';

describe('MissionTreeComponent', () => {
  let component: MissionTreeComponent;
  let fixture: ComponentFixture<MissionTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
