import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutBoxComponent } from './out-box.component';

describe('OutBoxComponent', () => {
  let component: OutBoxComponent;
  let fixture: ComponentFixture<OutBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
