import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Postulante } from '../modelos/postulante';

@Injectable({
  providedIn: 'root'
})
export class SubirFotoService {

  constructor(private http: HttpClient) { }

  httpOptions={
    headers: new HttpHeaders({
     'Content-Type':'application/json; charset=utf-8',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  url='http://localhost:8080/foto';
  urlDetector = 'http://localhost:8080/api/detector';
  urlReporte='http://localhost:8080/reporte';
  

  // subirFoto(file: File) {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);    
  //   return this.http.post(this.url+"/subir", formData,{responseType: 'text'});
  // } 

  subirFoto(file: File, nroDocumento:string) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('nroDocumento', nroDocumento);     
    return this.http.post(this.urlDetector+"/detectar-imagen", formData);
  } 

  subirFotodni(file: File, nroDocumento: string) {
    const formData = new FormData();
  formData.append('file', file, file.name);
  const request = new XMLHttpRequest();
  request.open('POST', this.url+"/subirdni/"+nroDocumento);
  request.send(formData);   
  } 

  guardarFoto(postulante:Postulante) {       
    return this.http.post<Postulante>(this.url, postulante,this.httpOptions);
  } 

  imprimirReporteService(postulante:Postulante){          
    return this.http.post<Postulante>(this.urlReporte, postulante,this.httpOptions);
   }

   abrirDniPdf(nroDocumento: string): Observable<any> {
    return this.http.get<any>(this.url+'/abrirPdf/'+nroDocumento);
   }
}
