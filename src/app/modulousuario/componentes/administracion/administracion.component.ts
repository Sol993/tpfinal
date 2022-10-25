import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Estado } from 'src/app/clases/estado';
import { Usuario } from 'src/app/clases/usuario';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  rolObtenido:string ='';
  arrayUsuarios? : any[];

  constructor(private _serv : ClinicaservicioService,) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  
  obtenerUsuarios(){
    this._serv.obtenerusuarios().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.arrayUsuarios = data;
      console.log(this.arrayUsuarios);
    });
  }
  rechazarEspecialista(usuario : any){
    usuario.estado=Estado.Rechazado;  
        this._serv.update(usuario.id, usuario)
        .then(() => console.log("exito!"))
        .catch(err => console.log(err));    
        
    
  }
  aprobarEspecialista(usuario : any){

    this._serv.registro(usuario.email,usuario.password).then(res=>
      {
          usuario.idUsuario = res?.user?.uid;
          usuario.estado=Estado.Aprobado;    
          this._serv.update(usuario.id, usuario)
        .then(() => console.log("exito!"))
        .catch(err => console.log(err));    
        
       });
  }

}
