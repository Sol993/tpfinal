import { Component, Input, OnInit } from '@angular/core';
import { Rol } from 'src/app/clases/rol';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selectorroles',
  templateUrl: './selectorroles.component.html',
  styleUrls: ['./selectorroles.component.css']
})
export class SelectorrolesComponent implements OnInit {

 
  keys = Object.keys;
  roles = Rol;
  mostrar?:string;
  mostrarSoloLetra?:string;
  @Input() item = '';

  @Output() seleccionarRolEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.mostrar= this.item;
  }
  
  rolSeleccionado(value:string){
    this.seleccionarRolEvent.emit(value);
  }

}
