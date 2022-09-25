import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postulante } from 'src/app/modelos/postulante';
import { PostulanteService } from 'src/app/postulante/postulante.service';
import { RegistrarPostulanteService } from 'src/app/registrar-postulante/registrar-postulante.service';

@Component({
  selector: 'app-postulante-detalle',
  templateUrl: './postulante-detalle.component.html',
  styleUrls: ['./postulante-detalle.component.css']
})
export class PostulanteDetalleComponent implements OnInit {

  
  postulante:Postulante= new Postulante();
  ultimo:string='';
  atras:number=0;
  
  constructor(private route: ActivatedRoute, private postulanteServicio: PostulanteService,
    private router: Router, private servicio:RegistrarPostulanteService) { }

  ngOnInit(): void {
    this.atras=0;   
    this.postulanteServicio.getUltimoPostulante().subscribe(data=>{
      this.postulante=data;
      this.ultimo=this.postulante.ultimo;

      this.servicio.getRegionId(Number(this.postulante.regionColegio)).subscribe(data=>{
       this.postulante.regionColegio=data.descripcion;
         });

         this.servicio.getProvinciaId(Number(this.postulante.provinciaColegio)).subscribe(data=>{
          this.postulante.provinciaColegio=data.descripcion;
            });

            this.servicio.getDistritoId(Number(this.postulante.distritoColegio)).subscribe(data=>{
              this.postulante.distritoColegio=data.descripcion;
                });


                this.servicio.getRegionId(Number(this.postulante.regionNacimiento)).subscribe(data=>{
                  this.postulante.regionNacimiento=data.descripcion;
                    });
           
                    this.servicio.getProvinciaId(Number(this.postulante.provinciaNacimiento)).subscribe(data=>{
                     this.postulante.provinciaNacimiento=data.descripcion;
                       });
           
                       this.servicio.getDistritoId(Number(this.postulante.distritoNacimiento)).subscribe(data=>{
                         this.postulante.distritoNacimiento=data.descripcion;
                           });



                           this.servicio.getRegionId(Number(this.postulante.regionDomicilio)).subscribe(data=>{
                            this.postulante.regionDomicilio=data.descripcion;
                              });
                     
                              this.servicio.getProvinciaId(Number(this.postulante.provinciaDomicilio)).subscribe(data=>{
                               this.postulante.provinciaDomicilio=data.descripcion;
                                 });
                     
                                 this.servicio.getDistritoId(Number(this.postulante.distritoDomicilio)).subscribe(data=>{
                                   this.postulante.distritoDomicilio=data.descripcion;
                                     });


                                     this.servicio.getColegioId(Number(this.postulante.colegio)).subscribe(data=>{
                                      this.postulante.colegio=data.descripcion;
                                        });

     });
  }

  atrasEditar(){
    this.atras=1;    
    this.servicio.getVerificarAtras(this.atras).subscribe(data=>{
    console.log('se enviio 1 para editar');
     })  
    this.router.navigate(["login/empleados/registrar-postulante"]);  
    this.atras=0;  
  }

  guardar(){
    this.atras=0; 
    this.router.navigate(["login/empleados/postulante-detalles/pago"]);  
    console.log('se enviio 0');   
  }

}
