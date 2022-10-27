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
import { LoadingComponent } from '../componentes/loading/loading.component';


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
  ],
  imports: [
    CommonModule,
    ModulousuarioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ], 

})
export class ModulousuarioModule { }
