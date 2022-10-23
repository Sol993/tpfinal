import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { Especialidad } from 'src/app/clases/especialidad';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-listadoespecialidades',
  templateUrl: './listadoespecialidades.component.html',
  styleUrls: ['./listadoespecialidades.component.css']
})
export class ListadoespecialidadesComponent implements OnInit {
  especialidades?: Array<Especialidad>;
  @Output() selecionarEspecialidadEvent = new EventEmitter<Array<string>>();
  seleccionados:string[]=[];
  
  constructor(private _serv : ClinicaservicioService) { }
  
  ngOnInit(): void {
    this.cargarEspecialidades();
  }
  selecionarEspecialidad()
  {
    this.selecionarEspecialidadEvent.emit(this.seleccionados);
  }

 cargarEspecialidades(){
  this._serv.obtenerEspecialidades().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )
    )
  ).subscribe(data => {
    this.especialidades = data;
  });;
 }
}
