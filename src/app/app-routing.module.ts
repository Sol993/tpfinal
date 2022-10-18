import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  { path:"", component: HomeComponent},
  { path:"home", component: HomeComponent},
  { path:"login", component : LoginComponent },
  { path:"registro" , component : RegistroComponent },
  { path: 'modulousuario', loadChildren: () => import('./modulousuario/modulousuario.module').then(m => m.ModulousuarioModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
