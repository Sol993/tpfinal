import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulousuarioRoutingModule } from './modulousuario-routing.module';
import { ModulousuarioComponent } from './modulousuario.component';
import { SelectorrolesComponent } from './componentes/selectorroles/selectorroles.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoespecialidadesComponent } from './componentes/listadoespecialidades/listadoespecialidades.component';
import { AgregarespecialidadComponent } from './componentes/agregarespecialidad/agregarespecialidad.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { MisturnosComponent } from './componentes/misturnos/misturnos.component';
import { MishorariosComponent } from './componentes/mishorarios/mishorarios.component';
import { PrimerLetraMayusculaPipe } from '../pipes/primer-letra-mayuscula.pipe';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { SolicitarturnosComponent } from './componentes/solicitarturnos/solicitarturnos.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    ModulousuarioComponent,
    SelectorrolesComponent,
    RegistroComponent,
    ListadoespecialidadesComponent,
    AgregarespecialidadComponent,
    LoginComponent,
    AdministracionComponent,
    PerfilComponent,
    MisturnosComponent,
    MishorariosComponent,
    PrimerLetraMayusculaPipe,
    TurnosComponent,
    SolicitarturnosComponent,

  ],
  imports: [
    CommonModule,
    ModulousuarioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
    
  ], 

})
export class ModulousuarioModule { }
