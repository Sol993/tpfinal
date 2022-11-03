import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-solicitarturnos',
  templateUrl: './solicitarturnos.component.html',
  styleUrls: ['./solicitarturnos.component.css']
})
export class SolicitarturnosComponent implements OnInit {
  usuario:Usuario = new Usuario();
  usuarios? : any[];
  especialistaSeleccionado? : any[];
  especialidades?: any[];

  constructor(private _servicio:ClinicaservicioService) { }

  ngOnInit(): void {
    this.usuarioLogueado();
    this.obtenerUsuarios();

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

  obtenerUsuarios(){
  
    this._servicio.obtenerusuarios().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.usuarios = data;
    });
  }

  filtroRol(rol : string){
    if(this.usuarios){
      return this.usuarios.filter(x => x.rol == rol);
    } else{
      return this.usuarios;
    }
  }

  onChangeEspecialista(e : any){
      
      if(this.usuarios){
        this.especialistaSeleccionado = this.usuarios.filter(x => x.idUsuario == e.target.value);
        this.especialidades = this.especialistaSeleccionado[0].especialidades;

        if(this.especialidades){
            //buscarHorarios
        }
      }


  }

}
