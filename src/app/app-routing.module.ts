import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { RolusuarioGuard } from './guards/rolusuario.guard';

const routes: Routes = [
  { path:"", component: HomeComponent},
  { path:"home", component: HomeComponent},
  { path:"loading", component:LoadingComponent},
  { path: 'usuario', loadChildren: () => import('./modulousuario/modulousuario.module').then(m => m.ModulousuarioModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
