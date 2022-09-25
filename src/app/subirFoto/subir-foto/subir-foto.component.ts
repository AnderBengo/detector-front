import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Postulante } from 'src/app/modelos/postulante';
import { PostulanteService } from 'src/app/postulante/postulante.service';
import { SubirFotoService } from '../subir-foto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrarPostulanteService } from 'src/app/registrar-postulante/registrar-postulante.service';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.css']
})



export class SubirFotoComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;  
  file?:File;
  preview = '';

  escuelaSeleccionada='';
  listaEscuela:any[]=[];

  selectedFilesdni?: FileList;
  currentFiledni?: File;  
  filedni?:File;
  previewdni = '';
  valor:number=0;
  postulante: any;

  fotoAceptada: boolean = false;

  escuelaProfesionalSeleccionada: any;
  
    constructor(private subirFotoServicio:SubirFotoService,
      private postulanteServicio:PostulanteService,private router: Router, private registrarPostulante: RegistrarPostulanteService) {
   }

  ngOnInit(): void {
    this.registrarPostulante.listaDeEscuelas().subscribe(response => {
      this.listaEscuela = response;
      console.log(this.listaEscuela)
    })
  
    this.postulanteServicio.getUltimoPostulante().subscribe((data: any)=>{
      this.postulante=data;
      console.log(this.postulante)
     })  ;

     
  }

  

  subirImagen(event: any){     
    this.selectedFiles= event.target.files;
    if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {     
      this.currentFile = file;
      this.subirFotoServicio.subirFoto(this.currentFile,this.postulante.nroDocumento).subscribe((data: any)=>{
        console.log('listaMensajes', data);
        
        if(data.validacionImagen) {
          Swal.fire('La foto se validó correctamente','','success')
          this.fotoAceptada = true;
        } else {
          let mensajeFinal = 'Errores: ';
          data.listaValidacionesIncorrectas.forEach((validacion: string, index: number) => {
            
            mensajeFinal += " "+ validacion.toLocaleLowerCase()
            if(data.listaValidacionesIncorrectas.length-1 == index) {
              mensajeFinal += '.'
            }else {
              mensajeFinal += ', '
            }
          });
          Swal.fire('Foto rechazada',mensajeFinal,'warning')
          this.fotoAceptada = false;
        }
          //this.currentFile=undefined;          
    });           
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
        $("#foto").prop("disabled", false);
      };
      reader.readAsDataURL(this.currentFile);
    }
    }       
  }

  subirDni(event: any){
    this.selectedFilesdni= event.target.files;
    if (this.selectedFilesdni) {
    const file: File | null = this.selectedFilesdni.item(0);
    if (file) {     
      this.currentFiledni = file;
      this.subirFotoServicio.subirFotodni(this.currentFiledni, this.postulante.nroDocumento);
    }
    }       

  }

  
  subir(){   
    
    // if ($('#foto').val().length == 0) {
    //   let texto = document.getElementById("msjReporte");
    //   texto!.innerHTML="SUBA LA FOTO";
      
    //   this.abrirAlerta("#alertaError");
    //   this.cerrarAlerta("#alertaError");
    //   return;
    // }

    // if ($('#dni').val().length == 0) {
    //   let texto = document.getElementById("msjReporte");
    //   texto!.innerHTML="SUBA PDF DEL DNI";
      
    //   this.abrirAlerta("#alertaError");
    //   this.cerrarAlerta("#alertaError");
    //   return;
    // }


      this.postulante.escuelaProfesional = this.escuelaProfesionalSeleccionada;
      console.log(this.postulante)
      this.subirFotoServicio.guardarFoto(this.postulante).subscribe(data=>{   
    }); 
    this.router.navigate(["login/empleados/subir-foto/postulante/"+this.postulante.nroDocumento]);       
    
}

cerrarAlerta(idAlerta: string){
  setTimeout(function()
  {  
    $(idAlerta).modal('hide');   
  }, 1500);    
}

abrirAlerta(idAlerta: string){
  $(idAlerta).modal('show'); 
}

imprimirReporte(){
  this.subirFotoServicio.imprimirReporteService(this.postulante).subscribe(dato => {         
   console.warn('si imprime');         
  });  

}

}