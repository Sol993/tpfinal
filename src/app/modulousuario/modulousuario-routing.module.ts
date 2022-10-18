import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulousuarioComponent } from './modulousuario.component';

const routes: Routes = [{ path: '', component: ModulousuarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulousuarioRoutingModule { }
