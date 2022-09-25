import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Postulante } from '../modelos/postulante';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {

  constructor(private http: HttpClient) { }


  httpOptions={
    headers: new HttpHeaders({
     'Content-Type':'application/json; charset=utf-8',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  urlguardaPostulante='http://localhost:8080/postulante';
  urlReporte='http://localhost:8080/reporte';
 

  postGuardarPostulante(postulante:Postulante){
    return this.http.post<Postulante>(this.urlguardaPostulante, postulante,this.httpOptions);
  }

  putGuardarPostulante(postulante:Postulante){
    return this.http.put<Postulante>(this.urlguardaPostulante, postulante,this.httpOptions);
  }

  getUltimoPostulante(){
    let nuevaUrl=this.urlguardaPostulante+"/recuperaPostulanteGuardar";       
    return this.http.get<Postulante>(nuevaUrl);
  }

    imprimirReporteService(postulante:Postulante){          
    return this.http.post<Postulante>(this.urlReporte, postulante,this.httpOptions);
   }
}
