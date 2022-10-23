import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ModulousuarioComponent } from './modulousuario.component';

const routes: Routes = 
[
  { path: '', component: ModulousuarioComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'login', component: LoginComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulousuarioRoutingModule { }
