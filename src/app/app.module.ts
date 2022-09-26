import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrarPostulanteComponent } from './registrar-postulante/registrar-postulante.component';
import { PostulanteComponent } from './postulante/postulante/postulante.component';
import { PostulanteDetalleComponent } from './postulante-detalle/postulante-detalle/postulante-detalle.component';
import { PagoComponent } from './pago/pago/pago.component';
import { SubirFotoComponent } from './subirFoto/subir-foto/subir-foto.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { ListarPostulantesComponent } from './listar-postulantes/listar-postulantes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarPostulanteComponent,
    PostulanteComponent,
    PostulanteDetalleComponent,
    PagoComponent,
    SubirFotoComponent,
    SpinnerComponent,
    ListarPostulantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
