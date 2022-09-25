import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colegio } from '../modelos/colegio';
import { Distrito } from '../modelos/distrito';
import { PideAuxiliar } from '../modelos/pideAuxiliar';
import { Provincia } from '../modelos/provincia';
import { Region } from '../modelos/region';

@Injectable({
  providedIn: 'root'
})
export class RegistrarPostulanteService {

  constructor(private http: HttpClient) { }

  httpOptions={
    headers: new HttpHeaders({
     'Content-Type':'application/json; charset=utf-8',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  urlconsultaPostulante='http://localhost:8080/inicio';
  urlPostulante='http://localhost:8080/postulante';
  urlRegion='http://localhost:8080/region';
  urlProvincia='http://localhost:8080/provincia';
  urlDistrito='http://localhost:8080/distrito';
  urlColegio='http://localhost:8080/colegio';

  getRegistraPostulante(){
    let nuevaUrl=this.urlconsultaPostulante+"/dataPide";       
    return this.http.get<PideAuxiliar>(nuevaUrl);
  } 

  getVerificarAtras(atras:number){
    let nuevaUrl=this.urlPostulante+"/verificarAtras/"+atras;       
    return this.http.get<number>(nuevaUrl);
  }

  getAtras(){
    let nuevaUrl=this.urlPostulante+"/atras/";       
    return this.http.get<number>(nuevaUrl);
  }

  getRegion(){
    let nuevaUrl=this.urlRegion+"/consulta";       
    return this.http.get<[Region]>(nuevaUrl);
  }

  getProvinciac(){
    let nuevaUrl=this.urlProvincia;       
    return this.http.get<[Provincia]>(nuevaUrl);
  }

  getDistritoc(){
    let nuevaUrl=this.urlDistrito;       
    return this.http.get<[Distrito]>(nuevaUrl);
  }

  getColegioc(){
    let nuevaUrl=this.urlColegio;       
    return this.http.get<[Colegio]>(nuevaUrl);
  }

  getProvincia(idProvinciaColegio:number){
    let nuevaUrl=this.urlProvincia+"/consulta/"+idProvinciaColegio;       
    return this.http.get<[Provincia]>(nuevaUrl);
  }

  getDistrito(idDistritoColegio:number){
    let nuevaUrl=this.urlDistrito+"/consulta/"+idDistritoColegio;       
    return this.http.get<[Distrito]>(nuevaUrl);
  }

  getColegio(idColegio:number){
    let nuevaUrl=this.urlColegio+"/consulta/"+idColegio;       
    return this.http.get<[Colegio]>(nuevaUrl);
  }

  getRegionId(idRegion:number){
    let nuevaUrl=this.urlRegion+"/consultaid/"+idRegion;       
    return this.http.get<Region>(nuevaUrl);
  }

  getProvinciaId(idProvincia:number){
    let nuevaUrl=this.urlProvincia+"/consultaid/"+idProvincia;       
    return this.http.get<Provincia>(nuevaUrl);
  }

  getDistritoId(idDistrito:number){
    let nuevaUrl=this.urlDistrito+"/consultaid/"+idDistrito;       
    return this.http.get<Distrito>(nuevaUrl);
  }

  getColegioId(idColegio:number){
    let nuevaUrl=this.urlColegio+"/consultaid/"+idColegio;       
    return this.http.get<Colegio>(nuevaUrl);
  }

  listaDeEscuelas(): Observable<any> {
    return this.http.get<any>(this.urlColegio+'/escuelas');
  }
}
