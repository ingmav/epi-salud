import { TestBed } from '@angular/core/testing';

import { PaginaBotonService } from './pagina-boton.service';

describe('PaginaBotonService', () => {
  let service: PaginaBotonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaBotonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
