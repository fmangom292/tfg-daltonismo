import { TestBed } from '@angular/core/testing';

import { TiempoReaccionService } from './tiempo-reaccion.service';

describe('TiempoReaccionService', () => {
  let service: TiempoReaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiempoReaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
