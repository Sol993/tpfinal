import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  rolObtenido:string ='';
  public email : string = "";
  public password : string = "";
  loguearse = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['',[Validators.required]],
  });
 usuario:Usuario= new Usuario();



  constructor(private fb: FormBuilder,private _ser: ClinicaservicioService,private _router: Router){ }

  ngOnInit(): void {
  }
  logIn():void
  {
    this.usuario.email = this.loguearse.value.email!.toString();
    this.usuario.password = this.loguearse.value.password!.toString();

    this._ser.login(this.usuario.email,this.usuario.password).then(res => { 
      if (res !== null) {      
        this._router.navigate(['/home']);
  
       }else{
        Swal.fire({
          title: 'Ups, ha ocurrido un error. Verifique el usuario y contraseña',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/assets/imagenes/nyan-cat.gif")
            left top
            no-repeat
          `
        });
      }
    });
  }
  mostrarFormulario(rol : string)
  {
    this.rolObtenido= rol;
  }
  usuarioRegistrado(){
    this.email="carla.autum@utn.com";
    this.password="1234567";
  }
  usuarioRegistradoDos(){

  this.email="cuenta@test.com";
  this.password="12345345";
}
usuarioRegistradoTres(){

  this.email="German.Guemes@test.com";
  this.password="1234567";
}
usuarioAdmin(){
  this.email="admin@admin.com";
  this.password="1234567";
}
usuarioEspecialita(){
  this.email="patricia.roberto@medico.com";
  this.password="contraseña1234";
}
usuarioEspecialitaDos(){
  this.email="dani@doc.com";
  this.password="123456";
}

}
