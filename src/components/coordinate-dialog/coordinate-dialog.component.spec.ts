import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateDialogComponent } from './coordinate-dialog.component';

describe('CoordinateDialogComponent', () => {
  let component: CoordinateDialogComponent;
  let fixture: ComponentFixture<CoordinateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
