import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPostulantesComponent } from './listar-postulantes/listar-postulantes.component';
import { LoginComponent } from './login/login/login.component';
import { PagoComponent } from './pago/pago/pago.component';
import { PostulanteDetalleComponent } from './postulante-detalle/postulante-detalle/postulante-detalle.component';
import { PostulanteComponent } from './postulante/postulante/postulante.component';
import { RegistrarPostulanteComponent } from './registrar-postulante/registrar-postulante.component';
import { SubirFotoComponent } from './subirFoto/subir-foto/subir-foto.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path : 'login',component : LoginComponent},
  {path : 'login/empleados',component:PostulanteComponent},
  {path : 'login/empleados/registrar-postulante',component : RegistrarPostulanteComponent},
  {path : 'login/empleados/postulante-detalles',component : PostulanteDetalleComponent},
  {path : 'login/empleados/postulante-detalles/pago',component : PagoComponent},  
  {path : 'login/empleados/subir-foto',component : SubirFotoComponent}, 
  {path : 'login/empleados/subir-foto/postulante/:dni',component : PostulanteComponent},
  {path : 'administracion',component : ListarPostulantesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
