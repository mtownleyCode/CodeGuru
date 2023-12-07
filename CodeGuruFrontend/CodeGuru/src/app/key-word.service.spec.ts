import { TestBed } from '@angular/core/testing';

import { KeyWordService } from './key-word.service';

describe('KeyWordService', () => {
  let service: KeyWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
