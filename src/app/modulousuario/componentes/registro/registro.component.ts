import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Especialistas } from 'src/app/clases/especialistas';
import { Estado } from 'src/app/clases/estado';
import { Fileupload } from 'src/app/clases/fileupload';
import { Paciente } from 'src/app/clases/paciente';
import { Rol } from 'src/app/clases/rol';
import { Usuario } from 'src/app/clases/usuario';
import { ArchivosService } from 'src/app/servicios/archivos.service';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public logueado: boolean = false;
  public logueadoAdmin: boolean = false;
  public usuarioLog : any;
  public validadorpassword: boolean = false ;

  mostrarElemento= 'mostrar';
  rolObtenido:string ='';
  crearnuevaEspecialidad:boolean=false;
  registroUsuario = this.fb.group({
    'nombre': ['', Validators.required],
    'apellido': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'password': ['',[Validators.required,Validators.minLength(8),Validators.maxLength(10)]],
    'confirmPassword': ['', [Validators.required]],
    'edad': ['',[Validators.required, Validators.min(18), Validators.max(100)]],
    'dni': ['',[Validators.required, Validators.min(11000000), Validators.max(1000000000)]],
    'obrasocial': ['',[Validators.required]],
    'especialidades'  : ['',[Validators.required]],
    'imgPerfilUno' : ['',[Validators.required]],
    'imgPerfilDos' : ['',[Validators.required]],
    'recaptcha' : ['',[Validators.required]],
  }
  );

  usuario:Usuario=new Usuario();
  paciente:Paciente= new Paciente();
  especialista:Especialistas=new Especialistas();
  seleccionados : string[] = [];
  selectedFiles?: FileList;
  currentFileUpload?: Fileupload;
  percentage = 0;
  token: string|undefined;

  constructor(private fb: FormBuilder,private _ser : ClinicaservicioService, private uploadService: ArchivosService, private _router: Router ) {}
  
  ngOnInit(): void {
    this.validadorpassword=false;
    this.token = undefined;
  }

  mostrarFormulario(rol : string)
  {
    this.rolObtenido= rol;
    switch(rol){
      case Rol.Paciente:  
      {

      }
    }
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
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

   upload(): any {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new Fileupload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);

          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  registrar(){
    if(this.registroUsuario.value.password !==this.registroUsuario.value.confirmPassword)
    {
      this.validadorpassword= true;
    }
    else{
    if(this.rolObtenido== Rol.Paciente)
    {
     
      this.paciente.nombre = this.registroUsuario.value.nombre?.toString();
      this.paciente.apellido = this.registroUsuario.value.apellido?.toString();
      this.paciente.edad = this.registroUsuario.value.edad?.toString();
      this.paciente.email = this.registroUsuario.value.email!.toString();
      this.paciente.password = this.registroUsuario.value.password!.toString();
      this.paciente.dni = this.registroUsuario.value.dni?.toString();
      this.paciente.obraSocial = this.registroUsuario.value.obrasocial?.toString();
      this.upload().finally((data: any)=>{ 
        console.log(data)
        this.paciente.imagenDePerfil = this.currentFileUpload?.url;
        this._ser.registro(this.paciente.email,this.paciente.password).then(res=>
          {
              this.paciente.idUsuario = res?.user?.uid;
              this.paciente.fechaCreacion=new Date(Date.now()).toLocaleString();
              this.paciente.imagenDePerfilDos=".\assets\imagenes\avatar-girl.jpg";
              this.paciente.estado=Estado.Aprobado;
              this.paciente.rol=Rol.Paciente;         
              console.log(res);
      
              
              this._ser.altaUsuarioBD(this.paciente).then(() => {
              });
              this._router.navigate(['home']);
           });
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
      this.especialista.rol=Rol.Especialista;     
      this.especialista.estado=Estado.Pendiente; 
      this.upload().finally((data: any)=>{ 
        this.especialista.imagenDePerfil = data.url;   

     
       this._ser.altaUsuarioBD(this.especialista).then(() => { 
              this._router.navigate(['home']);
            });   
          });
    }
  }
  }
  usuarioLogueado() {
    this._ser.getInfoUsuarioLogueado().subscribe(res => {
      if (res !== null) {
        this.logueado = true;

        this._ser.obtenerUsuarioPorID(res.uid).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data => {
          this.usuarioLog = data[0];
          if (this.usuarioLog.rol == "Administrador") {
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

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

  }

}
