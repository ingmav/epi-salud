import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map  } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  private httpFile: HttpClient;
  change$ = new BehaviorSubject(null);

  url         = `${environment.base_url}/subtema-font`;

  constructor(private http: HttpClient) { 
   
  }

  obtenerInformacion(id):Observable<any> {
    return this.http.get<any>(this.url+"/"+id, {}).pipe(
      map( response => {
        return response;
      })
    );
  }
}
