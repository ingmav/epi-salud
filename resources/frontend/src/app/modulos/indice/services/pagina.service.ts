import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {

  private httpFile: HttpClient;

  url_pagina            = `${environment.base_url}/pagina`;
  url_botones           = `${environment.base_url}/botones`;
  url_botones_hijos     = `${environment.base_url}/botones-hijos`;
  url_importar          = `${environment.base_url}/importar-cabecera`;
  url_del_imagen        = `${environment.base_url}/del-cabecera`;
  url_pagina_iframe     = `${environment.base_url}/iframe`;

  constructor(private http: HttpClient, handler: HttpBackend) { 
    this.httpFile = new HttpClient(handler);
  }
  
  obtenerPaginas(payload):Observable<any> {
    return this.http.get<any>(this.url_pagina, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getPagina(id, payload):Observable<any> {
    return this.http.get<any>(this.url_pagina+"/"+id, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  
  getButtons(payload):Observable<any> {
    return this.http.get<any>(this.url_botones, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  
  getButtonsHijos(payload):Observable<any> {
    return this.http.get<any>(this.url_botones_hijos, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  guardarPagina(payload):Observable<any> {
    return this.http.post<any>(this.url_pagina, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  
  guardarFrame(payload):Observable<any> {
    return this.http.post<any>(this.url_pagina_iframe, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  
  eliminarImage(id):Observable<any> {
    return this.http.delete<any>(this.url_del_imagen+"/"+id, {}).pipe(
      map( response => {
        return response;
      })
    );
  }

  ImportarFile(file:File, id): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('archivo', file, file.name);
    formData.append('id', id);

    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set(
      "Authorization",'Bearer '+localStorage.getItem("token"),
    );
    headers.append('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin','*');
    return this.httpFile.post(this.url_importar, formData, { headers:headers});
  }
}
