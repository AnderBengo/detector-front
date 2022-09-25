import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Postulante } from 'src/app/modelos/postulante';
import { PostulanteService } from 'src/app/postulante/postulante.service';
import { Colegio } from '../modelos/colegio';
import { Distrito } from '../modelos/distrito';
import { Provincia } from '../modelos/provincia';
import { Region } from '../modelos/region';
import { RegistrarPostulanteService } from './registrar-postulante.service';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-registrar-postulante',
  templateUrl: './registrar-postulante.component.html',
  styleUrls: ['./registrar-postulante.component.css']
})
export class RegistrarPostulanteComponent implements OnInit {

  listaEstadoCivil: any[]=[];
  listaColegios:Colegio[]=[];
  listaNacionalidad:any[]=[];
  listaDiscapacidad: any[]=[];
  listaSexo: any[]=[];
  listaTurno: any[]=[];
  
  listaRegionColegio: Region[]=[];
  listaDistritoColegio: Distrito[]=[];
  listaProvinciaColegio: Provincia[]=[];
  
  listaRegionDomicilio: Region[]=[];
  listaDistritoDomicilio: Distrito[]=[];
  listaProvinciaDomicilio: Provincia[]=[];

  listaRegionNacimiento: Region[]=[];
  listaDistritoNacimiento: Distrito[]=[];
  listaProvinciaNacimiento: Provincia[]=[];

  seleccionadaCivil:string='';
  lleva:number=0;

  id: number=0;
  postulante : Postulante = new Postulante();
  guardaPostulante : Postulante = new Postulante();
  submitted = false;
  paterno: string='';
  materno: string='';
  nombres: string='';
  civil:string='';
  sexo:string='';
  discapacidad:string='';
  fechaNacimiento: string='';
  telefono: string='';
  direccion: string='';
  email: string='';
  estadoCivil: string='';    
  nacionalidad: string='';
  regionNacimiento: string='';
  provinciaNacimiento: string='';
  distritoNacimiento: string='';
  regionDomicilio: string='';
  provinciaDomicilio: string='';
  distritoDomicilio: string='';
  anioEgreso: string='';
  promedioColegio: string='';
  regionColegio: string='';
  provinciaColegio: string='';
  distritoColegio: string='';
  colegio: string='';
  nombreApoderado: string='';
  paternoApoderado: string='';
  maternoApoderado: string='';
  telefonoApoderado: string='';
  turno: string='';

  FormPostulante: FormGroup;
  json:string='';

  idRegionColegio:number=0;
  idProvinciaColegio:number=0;
  idDistritoColegio:number=0;

  idRegionNacimiento:number=0;
  idProvinciaNacimiento:number=0;
  idDistritoNacimiento:number=0;

  idRegionDomicilio:number=0;
  idProvinciaDomicilio:number=0;
  idDistritoDomicilio:number=0;

  constructor(private postulanteServicio:PostulanteService,private router:Router,
    private registrarPostulanteServicio: RegistrarPostulanteService, private fb: FormBuilder) {  

      
   this.FormPostulante = this.fb.group({
    id: [''],
    documento: [''],
    modalidad: [''],
    paterno: [''],
    materno: [''],
    nombres: [''],
    fechaNacimiento: [''],
    telefono:[''],
    direccion: [''],
    email: [''],
    estadoCivil: [''],
    discapacidad: [''],
    sexo:[''],
    civil:[''],
    nacionalidad: [''],
    regionNacimiento: [''],
    provinciaNacimiento: [''],
    distritoNacimiento: [''],
    regionDomicilio: [''],
    provinciaDomicilio: [''],
    distritoDomicilio: [''],
    anioEgreso: [''],
    promedioColegio: [''],
    regionColegio: [''],
    provinciaColegio: [''],
    distritoColegio: [''],
    colegio: [''],
    nombreApoderado: [''],
    paternoApoderado: [''],
    maternoApoderado: [''],
    telefonoApoderado: [''],
    turno: [''],      
    });
   
   }


  ngOnInit(): void {
    this.getListaRegion();
    this.getListaProvincia();
    this.getListaDistrito();
    this.getListaColegio();
    $("#nombres").prop("disabled", true);
    $("#direccion").prop("disabled", true);
    $("#materno").prop("disabled", true);
    $("#paterno").prop("disabled", true);   

    $("#provinciaColegio").prop("disabled", true);
    $("#distritoColegio").prop("disabled", true);
    $("#colegio").prop("disabled", true);
    $("#provinciaNacimiento").prop("disabled", true);
    $("#distritoNacimiento").prop("disabled", true);
    $("#provinciaDomicilio").prop("disabled", true);
    $("#distritoDomicilio").prop("disabled", true);
    this.registrarPostulanteServicio.getAtras().subscribe(data=>{
      this.lleva=0;
     if(data==1){
      this.lleva=1;
      $("#provinciaColegio").prop("disabled", false);
    $("#distritoColegio").prop("disabled", false);
    $("#colegio").prop("disabled", false);
    $("#provinciaNacimiento").prop("disabled", false);
    $("#distritoNacimiento").prop("disabled", false);
    $("#provinciaDomicilio").prop("disabled", false);
    $("#distritoDomicilio").prop("disabled", false);
      console.log('data de atras es '+data);
      this.postulanteServicio.getUltimoPostulante().subscribe(data=>{
        this.postulante=data;        
        
       this.FormPostulante.get('regionColegio')?.setValue(this.postulante.regionColegio);
       this.FormPostulante.get('provinciaColegio')?.setValue(this.postulante.provinciaColegio);
       this.FormPostulante.get('distritoColegio')?.setValue(this.postulante.distritoColegio);
       this.FormPostulante.get('colegio')?.setValue(this.postulante.colegio);
       this.FormPostulante.get('regionNacimiento')?.setValue(this.postulante.regionNacimiento);
       this.FormPostulante.get('provinciaNacimiento')?.setValue(this.postulante.provinciaNacimiento);
       this.FormPostulante.get('distritoNacimiento')?.setValue(this.postulante.distritoNacimiento);
       this.FormPostulante.get('regionDomicilio')?.setValue(this.postulante.regionDomicilio);
       this.FormPostulante.get('provinciaDomicilio')?.setValue(this.postulante.provinciaDomicilio);
       this.FormPostulante.get('distritoDomicilio')?.setValue(this.postulante.distritoDomicilio);
       
        console.log('ultimo postulante para editar es '+this.postulante);
        })  
     }   else{
      console.log('data de atras es '+data);
      this.registrarPostulanteServicio.getRegistraPostulante().subscribe(data=>{
        this.postulante.direccion=data.direccion;
        this.postulante.nombres=data.prenombres;
        this.postulante.estadoCivil=data.estadoCivil;
        this.postulante.aPaterno=data.apPrimer;
        this.postulante.aMaterno=data.apSegundo;   
        this.postulante.nroDocumento=data.documento;
        this.postulante.modalidad=data.modalidad;
        
       });
     }   
     })  

     
   this.getListaEstadoCivil();
   this.getListaDiscapacidad();  
   this.getListaSexo();
   this.getListaNacionalidad();  
   this.getListaTurno();
  }

  nuevoEmpleado(): void {
    this.submitted = false;
    this.postulante = new Postulante();
  }

  

  onSubmit(){
    this.submitted = true;
    
  }

  irALaListaDeEmpleados(){
    this.router.navigate(['login/empleados']);
    //this.router.navigate([`/registrar-empleado/empleado-detalles/${this.id}`]);
  }

  cerrarAlerta(idAlerta: string){
    setTimeout(function()
    {  
      $(idAlerta).modal('hide');   
    }, 1500);    
  }
  
  abrirAlerta(idAlerta: string){   
    $(idAlerta).modal();
  }

  guardarPostulante(){

    if(this.FormPostulante.get('telefono')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO TELEFONO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('fechaNacimiento')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO FECHA";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('email')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO EMAIL";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('civil')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO ESTADO CIVIL";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('discapacidad')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO DISCAPACIDAD";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('sexo')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO SEXO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('nombreApoderado')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO NOMBRE APODERADO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('paternoApoderado')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO APELLIDO PATERNO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }


    if(this.FormPostulante.get('maternoApoderado')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO APELLIDO MATERNO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('telefonoApoderado')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO TELEFONO APODERADO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('nacionalidad')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO NACIONALIDAD";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('anioEgreso')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE ANIO EGRESO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('promedioColegio')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE CAMPO PROMEDIO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('regionColegio')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE REGION COLEGIO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('provinciaColegio')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE PROVINCIA COLEGIO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('distritoColegio')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE DISTRITO COLEGIO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('colegio')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE COLEGIO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('regionNacimiento')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE REGION NACIMIENTO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('provinciaNacimiento')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE PROVINCIA NACIMIENTO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('distritoNacimiento')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE DISTRITO NACIMIENTO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('regionDomicilio')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE REGION DOMICILIO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('provinciaDomicilio')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE PROVINCIA DOMICILIO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('distritoDomicilio')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE DISTRITO DOMICILIO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }

    if(this.FormPostulante.get('turno')?.value==''){       
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE TURNO";
     
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");     
      return;
    }



    if(this.FormPostulante.get('id')?.value==''){
      let postulante1: Postulante = {  
        id:this.FormPostulante.get('id')?.value, 
        nroDocumento:this.FormPostulante.get('documento')?.value,
        nombres: this.FormPostulante.get('nombres')?.value,
        aPaterno: this.FormPostulante.get('paterno')?.value,
        aMaterno: this.FormPostulante.get('materno')?.value,   
        fechaNacimiento: this.FormPostulante.get('fechaNacimiento')?.value,
        telefono:this.FormPostulante.get('telefono')?.value,
        direccion:this.FormPostulante.get('direccion')?.value,
        email:this.FormPostulante.get('email')?.value,
        estadoCivil:this.FormPostulante.get('civil')?.value,
        discapacidad: this.FormPostulante.get('discapacidad')?.value,  
        sexo:this.FormPostulante.get('sexo')?.value,   
        nombreApoderado:this.FormPostulante.get('nombreApoderado')?.value,
        paternoApoderado:this.FormPostulante.get('paternoApoderado')?.value,
        maternoApoderado:this.FormPostulante.get('maternoApoderado')?.value,   
        telefonoApoderado:this.FormPostulante.get('telefonoApoderado')?.value,
        nacionalidad:this.FormPostulante.get('nacionalidad')?.value,
        anioEgreso:this.FormPostulante.get('anioEgreso')?.value,
        promedioColegio:this.FormPostulante.get('promedioColegio')?.value,
        regionColegio:this.FormPostulante.get('regionColegio')?.value,
        provinciaColegio:this.FormPostulante.get('provinciaColegio')?.value,
        distritoColegio:this.FormPostulante.get('distritoColegio')?.value,
        colegio:this.FormPostulante.get('colegio')?.value,
        regionNacimiento:this.FormPostulante.get('regionNacimiento')?.value,
        provinciaNacimiento:this.FormPostulante.get('provinciaNacimiento')?.value,
        distritoNacimiento:this.FormPostulante.get('distritoNacimiento')?.value,
        regionDomicilio:this.FormPostulante.get('regionDomicilio')?.value,
        provinciaDomicilio:this.FormPostulante.get('provinciaDomicilio')?.value,
        distritoDomicilio:this.FormPostulante.get('distritoDomicilio')?.value,
        turno:this.FormPostulante.get('turno')?.value,
        modalidad:this.FormPostulante.get('modalidad')?.value,
        tipoDocumento:'',   
        transaccionPago:'',
        foto:'',
        ultimo:"ultimo",
        fotoValidada: false,
        dniValidado: false
         }    
         console.log(postulante1);
         postulante1.nroDocumento=postulante1.nroDocumento.substring(0, postulante1.nroDocumento.length - 1);
         this.postulanteServicio.postGuardarPostulante(postulante1).subscribe(dato => {
          console.log(dato);
          this.postulante = new Postulante();
          this.irALaListaDeEmpleados();
          this.router.navigate(["login/empleados/postulante-detalles"]);   
        },error => console.log(error));

    }else{
      let postulante1: Postulante = {  
        id:this.FormPostulante.get('id')?.value, 
        nroDocumento:this.FormPostulante.get('documento')?.value,
        nombres: this.FormPostulante.get('nombres')?.value,
        aPaterno: this.FormPostulante.get('paterno')?.value,
        aMaterno: this.FormPostulante.get('materno')?.value,   
        fechaNacimiento: this.FormPostulante.get('fechaNacimiento')?.value,
        telefono:this.FormPostulante.get('telefono')?.value,
        direccion:this.FormPostulante.get('direccion')?.value,
        email:this.FormPostulante.get('email')?.value,
        estadoCivil:this.FormPostulante.get('civil')?.value,
        discapacidad: this.FormPostulante.get('discapacidad')?.value,  
        sexo:this.FormPostulante.get('sexo')?.value,   
        nombreApoderado:this.FormPostulante.get('nombreApoderado')?.value,
        paternoApoderado:this.FormPostulante.get('paternoApoderado')?.value,
        maternoApoderado:this.FormPostulante.get('maternoApoderado')?.value,   
        telefonoApoderado:this.FormPostulante.get('telefonoApoderado')?.value,
        nacionalidad:this.FormPostulante.get('nacionalidad')?.value,
        anioEgreso:this.FormPostulante.get('anioEgreso')?.value,
        promedioColegio:this.FormPostulante.get('promedioColegio')?.value,
        regionColegio:this.FormPostulante.get('regionColegio')?.value,
        provinciaColegio:this.FormPostulante.get('provinciaColegio')?.value,
        distritoColegio:this.FormPostulante.get('distritoColegio')?.value,
        colegio:this.FormPostulante.get('colegio')?.value,
        regionNacimiento:this.FormPostulante.get('regionNacimiento')?.value,
        provinciaNacimiento:this.FormPostulante.get('provinciaNacimiento')?.value,
        distritoNacimiento:this.FormPostulante.get('distritoNacmiento')?.value,
        regionDomicilio:this.FormPostulante.get('regionDomicilio')?.value,
        provinciaDomicilio:this.FormPostulante.get('provinciaDomicilio')?.value,
        distritoDomicilio:this.FormPostulante.get('distritoDomicilio')?.value,
        turno:this.FormPostulante.get('turno')?.value,
        modalidad:this.FormPostulante.get('modalidad')?.value,
        tipoDocumento:'',   
        transaccionPago:'',
        foto:'',
        ultimo:"ultimo",
        fotoValidada: false,
        dniValidado: false
         }  
         console.log(postulante1);
         this.postulanteServicio.putGuardarPostulante(postulante1).subscribe(dato => {
          console.log(dato);
          this.postulante = new Postulante();          
          this.router.navigate(["login/empleados/postulante-detalles"]);   
        },error => console.log(error));
    }

    this.json = JSON.stringify(this.FormPostulante.value);    
    console.log('json es '+this.json);
  }

  getListaEstadoCivil() {
    this.listaEstadoCivil.push("Soltero/a");
    this.listaEstadoCivil.push("Casado/a");
    this.listaEstadoCivil.push("Divorciado/a");
  }

  getListaDiscapacidad() {
    this.listaDiscapacidad.push("Si");
    this.listaDiscapacidad.push("Ninguna");
    }

  getListaSexo() {
    this.listaSexo.push("Masculino");
    this.listaSexo.push("Femenino");  
  }

  getListaRegion() {

    this.registrarPostulanteServicio.getRegion().subscribe(dato => {
      console.log(dato);
      this.listaRegionColegio=[];
      this.listaRegionDomicilio=[];
    this.listaRegionNacimiento=[];

      this.listaRegionColegio=dato;
      this.listaRegionDomicilio=dato;
    this.listaRegionNacimiento=dato;
    });   
  }  

  getListaProvincia() {

    this.registrarPostulanteServicio.getProvinciac().subscribe(dato => {
      console.log(dato);
      this.listaProvinciaColegio=[];
      this.listaProvinciaDomicilio=[];
    this.listaProvinciaNacimiento=[];

      this.listaProvinciaColegio=dato;
      this.listaProvinciaDomicilio=dato;
    this.listaProvinciaNacimiento=dato;
    });   
  }  

  getListaDistrito() {

    this.registrarPostulanteServicio.getDistritoc().subscribe(dato => {
      console.log(dato);
      this.listaDistritoColegio=[];
      this.listaDistritoDomicilio=[];
    this.listaDistritoNacimiento=[];

      this.listaDistritoColegio=dato;
      this.listaDistritoDomicilio=dato;
    this.listaDistritoNacimiento=dato;
    });   
  }  

  getListaColegio() {

    this.registrarPostulanteServicio.getColegioc().subscribe(dato => {
      console.log(dato);
      this.listaColegios=[];


      this.listaColegios=dato;
     
    });   
  }  

  getListaNacionalidad(){
    this.listaNacionalidad.push("PERU");
    this.listaNacionalidad.push("ECUADOR");
    this.listaNacionalidad.push("CHILE");
    this.listaNacionalidad.push("ARGENTINA");
    this.listaNacionalidad.push("BOLIVIA");
    this.listaNacionalidad.push("BRASIL");
    this.listaNacionalidad.push("PARAGUAY");
    this.listaNacionalidad.push("URUGUAY");
    this.listaNacionalidad.push("EEUU");
    this.listaNacionalidad.push("COLOMBIA");
  }

  getListaTurno(){
    this.listaTurno.push("Turno Mañana");
    this.listaTurno.push("Turno tarde");
    this.listaTurno.push("turno Vespertino");    
  }

    onChangeRegionColegio(event:any) {   
      $("#provinciaColegio").prop("disabled", false);
      this.idRegionColegio= event.target.value; 
      if (this.idRegionColegio != 0) {
        this.registrarPostulanteServicio.getProvincia(this.idRegionColegio).subscribe(dato => {         
          this.listaProvinciaColegio=[];
          this.listaProvinciaColegio=dato;           
        });         
      } 
  }

  onChangeProvinciaColegio(event:any) {   
    $("#distritoColegio").prop("disabled", false);
    this.idProvinciaColegio= event.target.value; 
    if (this.idProvinciaColegio != 0) {
      this.registrarPostulanteServicio.getDistrito(this.idProvinciaColegio).subscribe(dato => {    
        this.listaDistritoColegio=[];  
        this.listaDistritoColegio=dato;         
      });         
    }  
}

onChangeDistritoColegio(event:any) {   
  $("#colegio").prop("disabled", false);
  this.idDistritoColegio= event.target.value; 
  if (this.idDistritoColegio != 0) {
    this.registrarPostulanteServicio.getColegio(this.idDistritoColegio).subscribe(dato => {  
      this.listaColegios=[];   
      this.listaColegios=dato;       
    });       
  } 
}


onChangeRegionNacimiento(event:any) {   
  $("#provinciaNacimiento").prop("disabled", false);
  this.idRegionNacimiento= event.target.value; 
  if (this.idRegionNacimiento != 0) {
    this.registrarPostulanteServicio.getProvincia(this.idRegionNacimiento).subscribe(dato => {    
      this.listaProvinciaNacimiento=[];         
      this.listaProvinciaNacimiento=dato;           
    });         
  } 
}

onChangeProvinciaNacimiento(event:any) {   
  $("#distritoNacimiento").prop("disabled", false);
this.idProvinciaNacimiento= event.target.value; 
if (this.idProvinciaNacimiento != 0) {
  this.registrarPostulanteServicio.getDistrito(this.idProvinciaNacimiento).subscribe(dato => {  
    this.listaDistritoNacimiento=[]; 
    this.listaDistritoNacimiento=dato;         
  });         
}  
}

onChangeDistritoNacimiento(event:any) {   

}

onChangeRegionDomicilio(event:any) {   
  $("#provinciaDomicilio").prop("disabled", false);
  this.idRegionDomicilio= event.target.value; 
  if (this.idRegionDomicilio != 0) {
    this.registrarPostulanteServicio.getProvincia(this.idRegionDomicilio).subscribe(dato => { 
      this.listaProvinciaDomicilio=[];        
      this.listaProvinciaDomicilio=dato;           
    });         
  } 
}

onChangeProvinciaDomicilio(event:any) { 
  $("#distritoDomicilio").prop("disabled", false);  
this.idProvinciaDomicilio= event.target.value; 
if (this.idProvinciaDomicilio != 0) {
  this.registrarPostulanteServicio.getDistrito(this.idProvinciaDomicilio).subscribe(dato => {      
    this.listaDistritoDomicilio=[];  
    this.listaDistritoDomicilio=dato;         
  });         
}  
}

onChangeDistritoDomicilio(event:any) {   

}


onChangeColegio(event:any) {   
}

}
