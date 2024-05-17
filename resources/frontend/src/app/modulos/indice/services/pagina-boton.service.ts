import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaginaBotonService {

  private httpFile: HttpClient;
  change$ = new BehaviorSubject(null);

  url_pagina_boton         = `${environment.base_url}/pagina-boton`;

  constructor(private http: HttpClient, handler: HttpBackend) { 
    this.httpFile = new HttpClient(handler);
  }

  obtenerPaginasBotones(payload):Observable<any> {
    return this.http.get<any>(this.url_pagina_boton, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  guardarPaginaBoton(payload):Observable<any> {
    return this.http.post<any>(this.url_pagina_boton, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  
  eliminarPaginaBoton(id):Observable<any> {
    return this.http.delete<any>(this.url_pagina_boton+"/"+id, {}).pipe(
      map( response => {
        return response;
      })
    );
  }
}
