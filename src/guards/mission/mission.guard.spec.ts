import { TestBed, async, inject } from '@angular/core/testing';

import { MissionGuard } from './mission.guard';

describe('MissionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionGuard]
    });
  });

  it('should ...', inject([MissionGuard], (guard: MissionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
