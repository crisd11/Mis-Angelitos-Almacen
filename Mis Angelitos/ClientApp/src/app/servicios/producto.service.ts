import { Injectable } from '@angular/core';
import { Producto } from '../data-models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient: HttpClient) { }

  public getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>('https://localhost:44365/productos/getproductos');
  }

}
