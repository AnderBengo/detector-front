import { Component, OnInit } from '@angular/core';
import { Postulante } from 'src/app/modelos/postulante';
import { PostulanteService } from '../postulante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { SubirFotoService } from 'src/app/subirFoto/subir-foto.service';


@Component({
  selector: 'app-postulante',
  templateUrl: './postulante.component.html',
  styleUrls: ['./postulante.component.css']
})
export class PostulanteComponent implements OnInit {
  postulante= new Postulante();
  constructor(private postulanteServicio:PostulanteService,private router: Router,private activatedRoute: ActivatedRoute, 
    private loginservice: LoginService, private subirFoto: SubirFotoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=> {
      let dni=params['dni']
      this.loginservice.buscarPostulantePorDni(dni).subscribe(response => this.postulante=response)

    } )
  }

  imprimirReporte(){
    this.postulanteServicio.imprimirReporteService(this.postulante).subscribe(dato => {         
     console.warn('si imprime');         
    });  
  
  }

  abrirDniPdf() {
    this.subirFoto.abrirDniPdf(this.postulante.nroDocumento)
        .subscribe()
  }

}
