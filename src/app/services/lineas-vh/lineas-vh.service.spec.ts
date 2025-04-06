import { TestBed } from '@angular/core/testing';

import { LineasVhService } from './lineas-vh.service';

describe('LineasVhService', () => {
  let service: LineasVhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineasVhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
