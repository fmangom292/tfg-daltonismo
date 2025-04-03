import { TestBed } from '@angular/core/testing';

import { MullerLyerService } from './muller-lyer.service';

describe('MullerLyerService', () => {
  let service: MullerLyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MullerLyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
