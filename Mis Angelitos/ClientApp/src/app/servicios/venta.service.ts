import { Injectable } from '@angular/core';
import { Venta } from '../data-models/venta';
import { DetalleVenta } from '../data-models/detalleVenta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private httpClient: HttpClient) {
    
   }

  public create(datos: any): Observable<any> {
    return this.httpClient.post('https://localhost:44365/ventas/create', JSON.stringify(datos),
        {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Headers', 'Content-Type')
        });
  }

  private postResponseJson(res: Response) {
    return res || {};
  }

}
