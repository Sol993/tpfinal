import { Component, Input, OnInit } from '@angular/core';
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
  mostrar?:string;
  @Input() item = '';
  constructor() { }

  ngOnInit(): void {
    this.mostrar= this.item;
  }
  
  rolSeleccionado(value:string){
    this.seleccionarRolEvent.emit(value);
  }

}
