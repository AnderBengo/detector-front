import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PostulanteService } from '../postulante/postulante.service';

@Component({
  selector: 'app-listar-postulantes',
  templateUrl: './listar-postulantes.component.html',
  styleUrls: ['./listar-postulantes.component.css']
})
export class ListarPostulantesComponent implements OnInit {
  postulantes: any[] =[];

  constructor(private postulanteService: PostulanteService) { }

  ngOnInit(): void {
    this.postulanteService.listarPostulantes()
        .subscribe(response => {
          this.postulantes = response;
          console.log(this.postulantes)
        })
  }

  verFOTO(nroDocumento: string) {
    let link2 = document.createElement("a");
    link2.href= `http://localhost:8080/foto/abrir-foto/${nroDocumento}`;
    
    link2.click();
  }

  verDNI(nroDocumento: string) {

    
      let link2 = document.createElement("a");
      link2.href= `http://localhost:8080/foto/abrirPdf/${nroDocumento}`;
      
      link2.click();
    
  }

  validarFoto(estado: string, nroDocumento: string){
    let postulante = {isFotoValidada: estado, nroDocumento: nroDocumento};
    this.postulanteService.validarFoto(postulante).subscribe(response => {
      Swal.fire('Guardado',response.mensaje,'success')
    })

  }

  validarDNI(estado: string, nroDocumento: string){
    let postulante = {isDniValidado: estado, nroDocumento: nroDocumento};
    this.postulanteService.validarDni(postulante).subscribe(response => {
      Swal.fire('Guardado',response.mensaje,'success')
    })
  }

}
