import { Component, Input, OnInit,SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { DiasAtencion } from 'src/app/clases/diasAtencion';
import { Horadiaatencion } from 'src/app/clases/horadiaatencion';
import { Horariosespecialista } from 'src/app/clases/horariosespecialista';
import { Usuario } from 'src/app/clases/usuario';
import { ClinicaservicioService } from 'src/app/servicios/clinicaservicio.service';

@Component({
  selector: 'app-mishorarios',
  templateUrl: './mishorarios.component.html',
  styleUrls: ['./mishorarios.component.css']
})
export class MishorariosComponent implements OnInit {

  @Input() usuarioInput = new Usuario(); // decorate the property with @Input()
  public usuario: any;
  keys = Object.keys;
  diasAtencion = DiasAtencion;
  verHorariosEspecialista : boolean = false;
  horarios: Horariosespecialista = new Horariosespecialista;
  especialidadSeleccionada = "";
  diasSeleccionados = new Array<String>;
  turnoSeleccionado = new Array<String>;
  arrayDiaHorarioAtencionSeleccionado = new Array<Horadiaatencion>();
  diaHorarioAtencion = new Array<Horadiaatencion>();
  diaHorarioAtencionTest = new Array<Horadiaatencion>();

  constructor(private _servicio:ClinicaservicioService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['usuarioInput']) {
        this.usuario = this.usuarioInput;
        this.obtenerHorarios()

        //obtenerDiasDeAtencion
       // this.obtenerTurnos(this.usuario.idUsuario);
        

    }
  }

  mostrarHorarios(idEspecialidad : string){
    this.verHorariosEspecialista = this.verHorariosEspecialista ? false : true;
    this.especialidadSeleccionada = idEspecialidad
  }

  seleccionarDiaAtencion(event: Event, paramDia : string){

    if((event.target as HTMLInputElement).style.backgroundColor == "red"){
      (event.target as HTMLInputElement).style.backgroundColor = "green"
      this.diasSeleccionados.push(paramDia);
     
    } else{
      (event.target as HTMLInputElement).style.backgroundColor = "red"
      //this.diasSeleccionados = this.diasSeleccionados.filter(obj => obj !== paramDia);
      const index = this.diasSeleccionados.indexOf(paramDia);
      if (index !== -1) {
        this.diasSeleccionados.splice(index, 1);
      }

    }
    
  }

  seleccionarHorario(event: Event, paramHora : string)
  {
    
    if((event.target as HTMLInputElement).checked){

      this.turnoSeleccionado.push(paramHora);

    } else{

    //  this.turnoSeleccionado = this.diasSeleccionados.filter(obj => obj !== paramHora);
      const index = this.turnoSeleccionado.indexOf(paramHora);
      if (index !== -1) {
        this.turnoSeleccionado.splice(index, 1);
      }

    }
  }

  obtenerHorarios(){
    this._servicio.obtenerHorarios().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.diaHorarioAtencionTest = data;
    })
  }

  guardarHorario(){
      this.diaHorarioAtencion = new Array<Object>();

      this.diasSeleccionados.forEach(element => {
        let dia = element as keyof typeof DiasAtencion;
        this.turnoSeleccionado.forEach(item => {
          let diaHorarioAtencionSeleccionado = new Object({'dia' : DiasAtencion[dia], 'horaInicio' :  item.split("-")[0], 'horaFin' : item.split("-")[1]});
          this.diaHorarioAtencion.push(diaHorarioAtencionSeleccionado);
        });

      });
      console.log(this.diaHorarioAtencionTest)
      console.log(this.diaHorarioAtencion)

      this.horarios.idEspecialista = this.usuario.idUsuario;
      this.horarios.idEspecialidad = this.especialidadSeleccionada;
      this.horarios.diaHorarioAtencion = this.diaHorarioAtencion;
      //this.horarios.diaHorarioAtencion = this.diaHorarioAtencionTest;

      this._servicio.agregarHorariosEspecialista(this.horarios);
  }

  obtenerHorario(idEspecialista : string){
    this._servicio.obtenerHorariosEspecialista(idEspecialista).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.horarios = data[0];
    })
  }
  
}
