import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { NavComponent } from './componentes/nav/nav.component';
import { HomeComponent } from './componentes/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClinicaservicioService } from './servicios/clinicaservicio.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from './componentes/loading/loading.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    NavComponent,
    HomeComponent,
    LoadingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ClinicaservicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
