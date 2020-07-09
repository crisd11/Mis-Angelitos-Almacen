import { Injectable } from '@angular/core';
import { Venta } from '../data-models/venta';
import { DetalleVenta } from '../data-models/detalleVenta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  formData: Venta;
  detalleVentas: DetalleVenta[];
  constructor() { }
}
