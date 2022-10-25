import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolusuarioGuard } from '../guards/rolusuario.guard';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ModulousuarioComponent } from './modulousuario.component';

const routes: Routes = 
[
  { path: '', component: ModulousuarioComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'administracion', component: AdministracionComponent,canActivate: [RolusuarioGuard] },
  { path: 'perfil', component: PerfilComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulousuarioRoutingModule { }
