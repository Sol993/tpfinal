import { Component, Input, OnInit , SimpleChanges } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent implements OnInit {

  public logueado: boolean = false;
  @Input() usuarioInput = new Usuario(); // decorate the property with @Input()
  public usuario: any;
  constructor(private _servicio:ClinicaservicioService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['usuarioInput']) {
        this.usuario = this.usuarioInput;
       
        //LLAMAR SERVICIO PARA TRAEER TURNOS
        //
    }
  }


}
