import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialistas } from 'src/app/clases/especialistas';
import { Estado } from 'src/app/clases/estado';
import { Paciente } from 'src/app/clases/paciente';
import { Rol } from 'src/app/clases/rol';
import { Usuario } from 'src/app/clases/usuario';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';
import { ConfirmedValidator } from 'src/app/validador/ConfirmedValidator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  mostrarElemento= 'mostrar';
  rolObtenido:string ='';
  crearnuevaEspecialidad:boolean=false;
  registroUsuario = this.fb.group({
    'nombre': ['', Validators.required],
    'apellido': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'password': ['',[Validators.required,Validators.minLength(8),Validators.maxLength(10)]],
    'confirmPassword': [['', Validators.required], { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    }],
    'edad': ['',[Validators.required, Validators.min(18), Validators.max(100)]],
    'dni': ['',[Validators.required, Validators.min(11000000), Validators.max(1000000000)]],
    'obrasocial': ['',[Validators.required]],
    'especialidades'  : ['',[Validators.required]],
  });
  usuario:Usuario=new Usuario();
  paciente:Paciente= new Paciente();
  especialista:Especialistas=new Especialistas();
  seleccionados : string[] = [];

  constructor(private fb: FormBuilder,private _ser : ClinicaservicioService,private _router: Router ) {}
  
  ngOnInit(): void {
  }

  mostrarFormulario(rol : string)
  {
    this.rolObtenido= rol;
  }
  sumarEspecialidad(){
  this.crearnuevaEspecialidad= !this.crearnuevaEspecialidad;
  }
  onReset(): void {
      this.registroUsuario.reset();
  }
  especilidadesSeleccionadas(paramSeleccionados: Array<string>)
  {
    this.seleccionados = paramSeleccionados;
    console.log(this.seleccionados)
  }
  registrar(){
    if(this.rolObtenido== Rol.Paciente)
    {
      this.paciente.nombre = this.registroUsuario.value.nombre?.toString();
      this.paciente.apellido = this.registroUsuario.value.apellido?.toString();
      this.paciente.edad = this.registroUsuario.value.edad?.toString();
      this.paciente.email = this.registroUsuario.value.email!.toString();
      this.paciente.password = this.registroUsuario.value.password!.toString();
      this.paciente.dni = this.registroUsuario.value.dni?.toString();
      this.paciente.obraSocial = this.registroUsuario.value.obrasocial?.toString();
      this._ser.registro(this.paciente.email,this.paciente.password).then(res=>
        {
            this.paciente.idUsuario = res?.user?.uid;
            this.paciente.fechaCreacion=new Date(Date.now()).toLocaleString();
            this.paciente.imagenDePerfil=".\assets\imagenes\avatar-girl.jpg";
            this.paciente.imagenDePerfilDos=".\assets\imagenes\avatar-girl.jpg";
            this.paciente.estado=Estado.Aprobado;
            this.paciente.rol=Rol.Paciente;         
            console.log(res);
    
            
            this._ser.altaUsuarioBD(this.paciente).then(() => {
            });
            this._router.navigate(['home']);
         });
    }
    if(this.rolObtenido== Rol.Especialista)
    {
      this.especialista.nombre = this.registroUsuario.value.nombre?.toString();
      this.especialista.apellido = this.registroUsuario.value.apellido?.toString();
      this.especialista.edad = this.registroUsuario.value.edad?.toString();
      this.especialista.email = this.registroUsuario.value.email!.toString();
      this.especialista.password = this.registroUsuario.value.password!.toString();
      this.especialista.dni = this.registroUsuario.value.dni?.toString();
      this.especialista.especialidades = this.seleccionados;
      this.especialista.fechaCreacion=new Date(Date.now()).toLocaleString();
      this.especialista.imagenDePerfil=".\assets\imagenes\avatar-girl.jpg";
      this.especialista.rol=Rol.Especialista;     
      this.especialista.estado=Estado.Pendiente;    
       this._ser.altaUsuarioBD(this.especialista).then(() => { 
              this._router.navigate(['home']);
            });   
    }
  }
}
