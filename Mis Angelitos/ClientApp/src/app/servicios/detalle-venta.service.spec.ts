import { TestBed } from '@angular/core/testing';

import { DetalleVentaService } from './detalle-venta.service';

describe('DetalleVentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleVentaService = TestBed.get(DetalleVentaService);
    expect(service).toBeTruthy();
  });
});
