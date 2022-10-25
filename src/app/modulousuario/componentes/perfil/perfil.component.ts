import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario:any;
  constructor(private _servicio:ClinicaservicioService) { }

  ngOnInit(): void {
    this.usuarioLogueado();
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
      }

  }
}
