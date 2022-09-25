import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Postulante } from 'src/app/modelos/postulante';
import { PostulanteService } from 'src/app/postulante/postulante.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  postulante:Postulante=new Postulante();

  constructor(private router: Router, private servicioPostulante: PostulanteService) { }

  ngOnInit(): void {
    this.servicioPostulante.getUltimoPostulante().subscribe(data=>{
      this.postulante.nombres=data.nombres+" "+data.aPaterno+" "+data.aMaterno;
      console.log('transaccion pago es '+data.transaccionPago);
    if(data.transaccionPago==""){
      this.router.navigate(["login/empleados/pago"]);  
    } else{
      this.router.navigate(["login/empleados/subir-foto"]);  
    }                
  });      
  }


  pagina(){  
    window.open("https://www.youtube.com/watch?v=MQtSdgg9DwI&list=RDMMR-CP5nvWRyo&index=5", '_blank');
   
  }

}
