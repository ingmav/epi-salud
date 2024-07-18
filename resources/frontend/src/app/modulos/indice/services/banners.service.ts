import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  private httpFile: HttpClient;

  change$ = new BehaviorSubject(null);

  url         = `${environment.base_url}/banner`;

  constructor(private http: HttpClient, handler: HttpBackend) { 
    this.httpFile = new HttpClient(handler);
  }

  listar(payload):Observable<any> {
    return this.http.get<any>(this.url, {params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }
  
  guardar(payload, file:File):Observable<any> {
    
    const formData: FormData = new FormData();

    if(file)
    {
      formData.append('archivo', file, file.name);  
    }
    
    formData.append('descripcion', payload.descripcion);
    formData.append('estatus_id', payload.estatus_id);
    formData.append('orden', payload.orden);
    formData.append('extension', payload.extension);
    formData.append('nombre', payload.archivo);
    formData.append('id', payload.id);
    
    
    let headers = new HttpHeaders().set(
      "Authorization",'Bearer '+localStorage.getItem("token"),
    );
    headers.append('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin','*');
    return this.httpFile.post(this.url, formData, { headers:headers});
  }
  
  eliminar(id):Observable<any> {
    return this.http.delete<any>(this.url+"/"+id, {}).pipe(
      map( response => {
        return response;
      })
    );
  }

  cargarImage(id):Observable<any>
  {
    return this.http.get<any>(this.url+"/"+id, {}).pipe(
      map( response => {
        return response;
      })
    );
  }

}
