import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubtemaService {

  url_subtema            = `${environment.base_url}/subtema`;
  
  constructor(private http: HttpClient) { }
  
  obtenerSubTemas(payload):Observable<any> {
    return this.http.get<any>(this.url_subtema, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  guardarSubTema(payload):Observable<any> {
    return this.http.post<any>(this.url_subtema, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  eliminarSubTema(id):Observable<any> {
    return this.http.delete<any>(this.url_subtema+"/"+id).pipe(
      map( response => {
        return response;
      })
    );
  }
}
