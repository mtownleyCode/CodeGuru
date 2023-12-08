import { TestBed } from '@angular/core/testing';

import { SnippetStatService } from './snippet-stat.service';

describe('SnippetStatService', () => {
  let service: SnippetStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnippetStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
