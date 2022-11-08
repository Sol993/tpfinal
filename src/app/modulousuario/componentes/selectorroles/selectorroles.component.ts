import { Component, Input, OnInit } from '@angular/core';
import { Rol } from 'src/app/clases/rol';
import { Output, EventEmitter } from '@angular/core';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';
import { Usuario } from 'src/app/clases/usuario';
import { map } from 'rxjs';

@Component({
  selector: 'app-selectorroles',
  templateUrl: './selectorroles.component.html',
  styleUrls: ['./selectorroles.component.css']
})
export class SelectorrolesComponent implements OnInit {

 
  keys = Object.keys;
  roles = Rol;
  mostrar?:boolean;
  mostrarSoloLetra?:string;
  usuario:Usuario= new Usuario();
  estadoLogueado:boolean=true;

  @Input() item = false;

  @Output() seleccionarRolEvent = new EventEmitter<string>();

  constructor(private _servicio: ClinicaservicioService) { }

  ngOnInit(): void {
    this.mostrar= this.item;
    this.usuarioLogueado();

  }
  
  rolSeleccionado(value:string){
    this.seleccionarRolEvent.emit(value);
  }
  
  usuarioLogueado() {
    let id = localStorage.getItem("usuarioID");
    if(id!== null){
         this._servicio.obtenerUsuarioPorID(id).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data => {
          this.usuario = data[0];
        });
        this.estadoLogueado=true;
      }else{
        this.estadoLogueado=false;
      }

      
  }

}
