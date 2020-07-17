import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../data-models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private httpClient: HttpClient) { }

  public getMarcas(): Observable<Marca[]> {
    return this.httpClient.get<Marca[]>('https://localhost:44365/marcas/getmarcas');
  }

  public create(nombre: string): Observable<any> {
    return this.httpClient.post('https://localhost:44365/marcas/create/'+ nombre, null);
  }

  public edit(data: string): Observable<any> {
    return this.httpClient.post('https://localhost:44365/marcas/edit'+ data, null);
  }

  public getByNombre(data: string): Observable<any> {
    return this.httpClient.get('https://localhost:44365/marcas/getbynombre'+ data);
  }

  public delete(data: string): Observable<any> {
    return this.httpClient.post('https://localhost:44365/marcas/delete'+ data, null);
  }

 /* public post<T>(route: string, body: any): Observable<Response<T>> {
		return this.httpClient.post(this.url + route, body, { withCredentials: true })
			.pipe(
				map(this.mapResponse),
				catchError((error) => { return this.handleError(error); })
			);
	}*/

}
