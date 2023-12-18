import { TestBed } from '@angular/core/testing';

import { AuthenticateInterceptorService } from './authenticate-interceptor.service';

describe('AuthenticateInterceptorService', () => {
  let service: AuthenticateInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
