import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public logueado:boolean;
  public usuario:any;

  constructor(private _router:Router, private _servicio: ClinicaservicioService) { 
    this.logueado=false;
  }

  ngOnInit(): void {
    
  }
  usuarioLogueado(){
    this._servicio.getInfoUsuarioLoggeado().subscribe(res=>{
      if(res!=null){
        this.logueado=true;
        this.usuario=res;
      }else{
        this.logueado=false;
      }
    });
    
  }
  logOut():void
  {
    this._servicio.logOut().then(res=>{
      this.logueado=false;
      this._router.navigate(['home']);
    });
  }

}
