import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulousuarioRoutingModule } from './modulousuario-routing.module';
import { ModulousuarioComponent } from './modulousuario.component';


@NgModule({
  declarations: [
    ModulousuarioComponent
  ],
  imports: [
    CommonModule,
    ModulousuarioRoutingModule
  ]
})
export class ModulousuarioModule { }
