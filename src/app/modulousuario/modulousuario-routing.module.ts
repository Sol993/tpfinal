import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogueadoGuard } from '../guards/logueado.guard';
import { RolusuarioGuard } from '../guards/rolusuario.guard';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SolicitarturnosComponent } from './componentes/solicitarturnos/solicitarturnos.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { ModulousuarioComponent } from './modulousuario.component';

const routes: Routes = 
[
  { path: '', component: ModulousuarioComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'administracion', component: AdministracionComponent,canActivate: [RolusuarioGuard] },
  { path: 'perfil', component: PerfilComponent ,canActivate: [LogueadoGuard]},
  { path: 'turnos', component: TurnosComponent ,canActivate: [RolusuarioGuard]},
  { path: 'solicitarturnos', component: SolicitarturnosComponent ,canActivate: [LogueadoGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulousuarioRoutingModule { }
