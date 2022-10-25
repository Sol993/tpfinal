import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { Rol } from '../clases/rol';
import { Usuario } from '../clases/usuario';
import { ClinicaservicioService } from '../servicios/clinicaservicio.service';

@Injectable({
  providedIn: 'root'
})
export class RolusuarioGuard implements CanActivate {
  usuario : Usuario = new Usuario();
   
  constructor(private _serv: ClinicaservicioService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let id = localStorage.getItem("usuarioID");
      if(id !== null){

      return this._serv.obtenerUsuarioPorID(id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).pipe(map((data) => {
        if ( data[0].rol == "Administrador") {
          return true;
        } else {

          this.router.navigate(['home']);
          return false;
        }    
  
      }));
    } else{
      this.router.navigate(['home']);
      return false;
    }
      
      
      /*return this._serv.getInfoUsuarioLogueado()
      .pipe( map((res) => {
            if (res !== null) {              
            return true
          } else{
            window.alert('Access denied!');
            return false
          }})
      );
  
      this._serv.getInfoUsuarioLogueado().subscribe(res => {
        if (res !== null) {
          return true
        } else{
          return false
        }
      });*/
    
  }
  
}
