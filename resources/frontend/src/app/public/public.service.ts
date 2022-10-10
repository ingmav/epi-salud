import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  url                                     = `${environment.base_url}/donantes`;                         
  url_info_donante                        = `${environment.base_url}/qr-donador/`;
  // url_catalogo_diagnostico_autocomplet    = `${environment.base_url}/busqueda-diagnosticos`;
  url_personas_callcenter                 = `http://contingencia.saludchiapas.gob.mx/api/search-personas`;
  url_id_persona_callCenter               = `http://contingencia.saludchiapas.gob.mx/api/search-personas`;

  url_filter_catalogs                     =  `${environment.base_url}/catalogos-lista-filtros`;
  url_obtener_catalogos                   =  `${environment.base_url}/catalogos`;
  url_calcular_curp                       =  'http://curpmexico.ddns.net:8082/api/curp';



  constructor(private http: HttpClient) { }

  getDonantesList(payload):Observable<any> {
    return this.http.get<any>(this.url,{params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getDonantesFilters(filters):Observable<any> {
    return this.http.get<any>(this.url,{params: filters}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getDonante(id) {
    return this.http.get<any>(this.url+'/'+id,{}).pipe(
      map( (response: any) => {
        return response;
      }
    ));
  }

  verInfoDonante(id:any,payload:any):Observable<any>{
    return this.http.get<any>(this.url_info_donante + id, {params:payload}).pipe(
      map( (response: any) => {
        return response;
      })
    );
  }

  getFilterCatalogs():Observable<any>{
    return this.http.get<any>(this.url_filter_catalogs).pipe(
      map(response => {
        return response;
      })
    );
  }

  calcularCurp(payload):Observable<any> {
    return this.http.get<any>(this.url_calcular_curp+payload).pipe(
      map( response => {
        console.log("curp",response);
        return response;
      })
    );
  }

  obtenerCatalogos(payload) {
    return this.http.post<any>(this.url_obtener_catalogos,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  updateDonante(id,payload) {
    return this.http.put<any>(this.url+'/'+id,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  createDonante(payload) {
    return this.http.post<any>(this.url,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }  

  deleteDonante(id) {
    return this.http.delete<any>(this.url+'/'+id,{}).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

}
