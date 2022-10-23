import { Estado } from "./estado";
import { Rol } from "./rol";

export class Usuario {
    idUsuario?:string;
    nombre?:string;
    apellido?:string;
    edad?:string;
    dni?:string;
    imagenDePerfil?:string;
    fechaCreacion:string="";
    email:string="";
    password:string="";
    rol?:Rol;
    estado?:Estado;

}
