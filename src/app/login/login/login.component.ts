import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/modelos/login';
import { PideAuxiliar } from 'src/app/modelos/pideAuxiliar';
import Swal from 'sweetalert2';
import { LoginService } from '../login.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  postulanteDatos = new PideAuxiliar();
  formPostulante: FormGroup;
  login:Login=new Login();  
  seleccionadaModalidad:string='';
  listaModalidiad:any[]=[];
  

  constructor(private fb: FormBuilder,private servicioLogin: LoginService,
    private router: Router) {

      this.formPostulante = this.fb.group({
        NroDocumento: [''],
        digito: [''],   
        modalidad: [''], 
        skills: this.fb.array([]),
      });      
   }

  

  ngOnInit(): void {
    this.listaModalidiad.push("Primera opcion");
    this.listaModalidiad.push("Ordinario");
    this.listaModalidiad.push("Segunda opcion");
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

  iniciar(){
    if(this.formPostulante.get('NroDocumento')?.value==''){
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE NUMERO DOCUMENTO";
      
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");
      return;
    }

    if(this.formPostulante.get('digito')?.value==''){
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="LLENE DIGITO DE VERIFICACION";
      
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");
      return;
    }

    if(this.formPostulante.get('modalidad')?.value==''){
      let texto = document.getElementById("msjReporte");
      texto!.innerHTML="SELECCIONE MODALIDAD";
      
      this.abrirAlerta("#alertaError");
      this.cerrarAlerta("#alertaError");
      return;
    }
 
   // this.preview = JSON.stringify(this.FormPostulante.value);    

   this.servicioLogin.buscarPostulantePorDniYDigito(this.formPostulante.get('NroDocumento')?.value, this.formPostulante.get('digito')?.value)
          .subscribe(response => {
            console.log(response)
            if(response == null) {
              this.servicioLogin.getConsultaPostulante(this.formPostulante.get('NroDocumento')?.value,
              this.formPostulante.get('modalidad')?.value,this.formPostulante.get('digito')?.value)
              .subscribe(data => {       
                this.postulanteDatos=new PideAuxiliar();
                this.postulanteDatos=data;
          
                
          
                console.log('en la data hay '+this.postulanteDatos.exito.toString());
                if(this.postulanteDatos.exito=="true"){
                  console.log("si pasa todo los datos "+this.formPostulante.get('NroDocumento')?.value+this.formPostulante.get('digito')?.value);
                  this.router.navigate(["login/empleados/registrar-postulante"]);   
                }else{
                  console.log("aqi va el caso contrario");
                }
                         
                
              },err => {
                if(err.status == 400) {
                  Swal.fire('Alerta',err.error,'warning')
                }
              });
            }

            if(response != null){

              if(response.foto != null || response.fotodni != null) {
                if((response.fotodni && !response.dniValidado) || !response.fotodni){
                  console.log("1")
                  this.router.navigate(['login/empleados/subir-foto']);
                  return
                }

                if((!response.fotoValidada && response.foto) || !response.foto) {
                  console.log("2")
                  this.router.navigate(['login/empleados/subir-foto']);
                  return
                }

                console.log("3")

                 this.router.navigate(['/login/empleados/subir-foto/postulante', response.nroDocumento]);
                return
              }

  
              console.log(response.transaccionPago)
              if(response.transaccionPago != null) {
                this.router.navigate(['login/empleados/subir-foto']);
                return
              }
  
              if(response.nombres != null) {
                this.router.navigate(['/login/empleados/postulante-detalles/pago']);
                return
              }
            }

          },err => {
            if(err.status == 400) {
              Swal.fire('Alerta',err.error,'warning')
            }
          })
   

  }
  
    generarReporteEpp(){
      
    }

    numberOnly(event:any): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
  
    }

}
