import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  url_tema            = `${environment.base_url}/tema`;
  url_tema_plataforma = `${environment.base_url}/tema-plataforma`;
  url_slides          = `${environment.base_url}/slides`;
  
  constructor(private http: HttpClient) { }
  
  obtenerTemas(payload):Observable<any> {
    return this.http.get<any>(this.url_tema, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  
  obtenerSlides():Observable<any> {
    return this.http.get<any>(this.url_slides, {}).pipe(
      map( response => {
        return response;
      })
    );
  }

  obtenerTemasPlataforma():Observable<any> {
    return this.http.get<any>(this.url_tema_plataforma, {}).pipe(
      map( response => {
        return response;
      })
    );
  }

  guardarTema(payload):Observable<any> {
    return this.http.post<any>(this.url_tema, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  eliminarTema(id):Observable<any> {
    return this.http.delete<any>(this.url_tema+"/"+id, {}).pipe(
      map( response => {
        return response;
      })
    );
  }
}
