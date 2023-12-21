import { TestBed } from '@angular/core/testing';

import { IdleWatchService } from './idle-watch.service';

describe('IdleWatchService', () => {
  let service: IdleWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdleWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
