import { Injectable } from '@angular/core';
import{ AngularFireAuth }from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Especialidad } from '../clases/especialidad';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class ClinicaservicioService {

  private usuario: AngularFirestoreCollection<Usuario>;
  private especialidad: AngularFirestoreCollection<Especialidad>;


  constructor(private _auth :AngularFireAuth,private _db :AngularFirestore) {
    this.usuario = _db.collection('usuarios');
    this.especialidad = _db.collection('especialidades');

   }
   //registro
   async registro(email:string,password:string)
  {
    try
    {
      return await this._auth.createUserWithEmailAndPassword(email,password);
    }
    catch(error)
    {
      Swal.fire({
        title: 'No se ha podio realizar el registro ' + error,
        width: 600,
        padding: '3em',
        color: '#716add',
      })
      return null;
    }
  }
  //login
  async login(email: string, password: string){
    try{
      return await this._auth.signInWithEmailAndPassword(email,password);
      
    }
    catch(error){
      Swal.fire({
        title: 'Erorr tu email o contraseña es invalidad  ' + error,
        width: 600,
        padding: '3em',
        color: '#716add',
      })
      return null;
    }
  }
  async logOut()
  {
    this._auth.signOut();
   
  }
  getInfoUsuarioLoggeado()
  {
    return this._auth.authState;
  }
  //altausuario bd
  altaUsuarioBD(user: Usuario): any {
    return this.usuario.add({ ...user });
  }
  obtenerEspecialidades(): AngularFirestoreCollection<Especialidad> {
    return this.especialidad;
  }

  agregarEspecialidad(nuevaespecialidad: Especialidad): any {
    return this.especialidad.add({ ...nuevaespecialidad });
  }

}
