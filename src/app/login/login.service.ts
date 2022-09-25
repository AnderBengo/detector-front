import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PideAuxiliar } from '../modelos/pideAuxiliar';
import { Login } from '../modelos/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  httpOptions={
    headers: new HttpHeaders({
     'Content-Type':'application/json; charset=utf-8',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  urlconsultaPostulante='http://localhost:8080/inicio';

  getConsultaPostulante(documento: string, modalidad:string,digito:string){
    let nuevaUrl=this.urlconsultaPostulante+"/consulta/"+documento+"/modalidad/"+modalidad+"/digito/"+digito;       
    return this.http.get<PideAuxiliar>(nuevaUrl);
  }

  buscarPostulantePorDni(dni: string): Observable<any> {
    return this.http.get<any>(this.urlconsultaPostulante+'/buscar-por-dni/'+dni);
  }

  buscarPostulantePorDniYDigito(dni: string, digito: number): Observable<any> {
    return this.http.get<any>(this.urlconsultaPostulante+'/buscar-por-dni/'+dni+'/'+digito);
  }


}
