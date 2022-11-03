import { Injectable } from '@angular/core';
import{ AngularFireAuth }from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Especialidad } from '../clases/especialidad';
import { Horadiaatencion } from '../clases/horadiaatencion';
import { Horariosespecialista } from '../clases/horariosespecialista';
import { Turno } from '../clases/turno';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class ClinicaservicioService {

  private usuario: AngularFirestoreCollection<Usuario>;
  private especialidad: AngularFirestoreCollection<Especialidad>;
  private turnos: AngularFirestoreCollection<Turno>;
  private horarios : AngularFirestoreCollection<Horariosespecialista>;
  private hora : AngularFirestoreCollection<Horadiaatencion>;

  public currentUser: any;


  constructor(private _auth :AngularFireAuth,private _db :AngularFirestore, private spinnerService: NgxSpinnerService) {
    this.usuario = _db.collection('usuarios');
    this.especialidad = _db.collection('especialidades');
    this.turnos = _db.collection('turnos');
    this.horarios = _db.collection('horariosEspecialista');
    this.hora = _db.collection('horario');


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
      this.spinnerService.show();
     // return await this._auth.signInWithEmailAndPassword(email,password);
     return this._auth.signInWithEmailAndPassword(email, password)
     .then((user)=>{
       this._db.collection("usuarios").ref.where("email", "==", user.user?.email).onSnapshot(snap =>{
         snap.forEach(userRef => {
          this.spinnerService.hide();
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

  obtenerTurnos(): AngularFirestoreCollection<Turno> {
    return this.turnos;
  }

  obtenerTurnosPorUsuario(idFilter: string):  AngularFirestoreCollection<Turno>{
    return this._db.collection('turnos', ref => ref.where('idUsuario','==', idFilter ));

  }

  obtenerHorariosEspecialistaPorEspecialidad(idFilter: string):  AngularFirestoreCollection<Horariosespecialista>{
    return this._db.collection('horariosEspecialista', ref => ref.where('codigoEspecilista','==', idFilter ));
  }

  obtenerHorariosEspecialista(idFilter: string):  AngularFirestoreCollection<Horariosespecialista>{
    return this._db.collection('horariosEspecialista', ref => ref.where('idEspecialista','==', idFilter ));
  }

  agregarHorariosEspecialista(nuevoHorario:  Horariosespecialista): any {
      this.horarios.add({ ...nuevoHorario});
      
  }

  agregarHorario(nuevoHorario:  Horadiaatencion): any {
    this.hora.add({ ...nuevoHorario});
    
}
}
