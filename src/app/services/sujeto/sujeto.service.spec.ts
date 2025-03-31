import { TestBed } from '@angular/core/testing';

import { SujetoService } from './sujeto.service';

describe('SujetoService', () => {
  let service: SujetoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SujetoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
