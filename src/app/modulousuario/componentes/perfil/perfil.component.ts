import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario:Usuario = new Usuario();
  mostrarMisturnos:boolean=false;
  constructor(private _servicio:ClinicaservicioService) { }

  ngOnInit(): void {
    this.usuarioLogueado();
  }

  mostrarHorarios()
  {
    this.mostrarMisturnos = this.mostrarMisturnos ? false : true;


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
          console.log(this.usuario)
        });
      }

  }
}
