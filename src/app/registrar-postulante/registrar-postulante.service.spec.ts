import { TestBed } from '@angular/core/testing';

import { RegistrarPostulanteService } from './registrar-postulante.service';

describe('RegistrarPostulanteService', () => {
  let service: RegistrarPostulanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarPostulanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
