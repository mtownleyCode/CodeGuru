import { TestBed } from '@angular/core/testing';

import { QueryTemplateService } from './query-template.service';

describe('CustomQueryService', () => {
  let service: QueryTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
