import { Component , OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';


@Component({
  selector: 'app-agregarespecialidad',
  templateUrl: './agregarespecialidad.component.html',
  styleUrls: ['./agregarespecialidad.component.css']
})
export class AgregarespecialidadComponent implements OnInit {

  nuevaEspecialidad: Especialidad= new Especialidad();
  textoingresado?:string;

  constructor(private _ser : ClinicaservicioService) { }

  ngOnInit(): void {
  }
  
  agregarEspecialidad(){
    this.nuevaEspecialidad.nombre= this.textoingresado;
    this._ser.agregarEspecialidad(this.nuevaEspecialidad);
  }

}
