import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/clases/rol';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selectorroles',
  templateUrl: './selectorroles.component.html',
  styleUrls: ['./selectorroles.component.css']
})
export class SelectorrolesComponent implements OnInit {

  @Output() seleccionarRolEvent = new EventEmitter<string>();
  keys = Object.keys;
  roles = Rol;

  constructor() { }

  ngOnInit(): void {
  }

  rolSeleccionado(value:string){
    this.seleccionarRolEvent.emit(value);
  }

}
