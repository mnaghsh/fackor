import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveNewsComponent } from './archive-news.component';

describe('ArchiveNewsComponent', () => {
  let component: ArchiveNewsComponent;
  let fixture: ComponentFixture<ArchiveNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
