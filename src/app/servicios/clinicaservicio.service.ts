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
  public currentUser: any;


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
    try
    {
     // return await this._auth.signInWithEmailAndPassword(email,password);
     return this._auth.signInWithEmailAndPassword(email, password)
     .then((user)=>{
       this._db.collection("usuarios").ref.where("email", "==", user.user?.email).onSnapshot(snap =>{
         snap.forEach(userRef => {
           this.currentUser = userRef.data();
           let idUsuario:string = this.currentUser.idUsuario
           localStorage.setItem("usuarioID", idUsuario)
         })
       })
      })
    }
    catch(error)
    {
      Swal.fire({
        title: '"No se ha podio realizar el login  ' + error,
        width: 600,
        padding: '3em',
        color: '#716add',
      })
      console.log("No se ha podio realizar el login "+ error);
      return null;
    }
  }
  async logOut()
  {
    this._auth.signOut();
    localStorage.removeItem('usuarioID');
  }
  getInfoUsuarioLogueado()
  {
    return this._auth.authState;
  }

  obtenerUsuarioPorID(idFilter: string):  AngularFirestoreCollection<Usuario>{
    return this._db.collection('usuarios', ref => ref.where('idUsuario','==', idFilter ));
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
  obtenerusuarios(): AngularFirestoreCollection<Usuario> {
    return this.usuario;
  }
  update(id: string, data: any): Promise<void> {
    return this.usuario.doc(id).update(data);
  }

}
