import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public logueado: boolean = false;
  public logueadoAdmin: boolean = false;
  public usuario: any;

  constructor(private _router:Router, private _servicio: ClinicaservicioService) { 
    this.logueado=false;
    this.logueadoAdmin=false;
  }


  ngOnInit(): void {
    this.usuarioLogueado();
  }


  usuarioLogueado() {
    this._servicio.getInfoUsuarioLogueado().subscribe(res => {
      if (res !== null) {
        this.logueado = true;

        this._servicio.obtenerUsuarioPorID(res.uid).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data => {
          this.usuario = data[0];
          if (this.usuario.rol == "Administrador") {
            this.logueadoAdmin=true;
          } else {
            this.logueadoAdmin = false;
          }

        });

      } else {
        this.logueado = false;
        this.logueadoAdmin = false;

      }
    })
  }
  cerrarSesion() {
    this.logueado= false;
    this.logueadoAdmin = false;
    this._servicio.logOut();
    this._router.navigate(['/usuario/login']);
    /*this._servicio.logOut().then (res=>{
     

    });*/
  }

}
