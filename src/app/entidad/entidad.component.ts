import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'app/servicios/alertas/alertas.service';
import { EntidadesService } from '../servicios/entidades/entidades.service';
import { Estudiante } from '../clases/entidades/estudiante';
import { Profesor } from '../clases/entidades/Profesor';
import { Colegio } from '../clases/entidades/Colegio';
import { Curso } from '../clases/entidades/Curso';
import { Asignatura } from '../clases/entidades/Asignatura';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {


  objects = [{nombre:'ESTUDIANTE', value:1},{nombre:'CURSO', value:2},{nombre:'ASIGNATURA', value:3},{nombre:'PROFESOR', value:4},{nombre:'COLEGIO', value:5}];

  public entidadTitle = '';
  public entidad = 0;

  public objColegio : Colegio = new Colegio();
  public objEstudiante: Estudiante = new Estudiante();
  public objDocente : Profesor = new Profesor();
  public objCurso : Curso = new Curso();
  public objAsignatura : Asignatura = new Asignatura();

  public colegios : Colegio[] = [];
  public profesores : Profesor[] = [];
  public cursos : Curso[] = [];
  public estudiantes : Estudiante[];
  public asignaturas : Asignatura[] = [];

  public displayedColumns: string[] = [ 'codigo','nombre', 'curso', 'Estudiantes'];
  public dataSource = new MatTableDataSource([]);

  public displayedColumns2: string[] = [ 'codigo','nombre'];
  public dataSource2 = new MatTableDataSource([]);


  constructor(private alerta:AlertasService, private entidadService: EntidadesService) { }


  ngOnInit() {
    this.cargarEstudiantes();
    this.cargarProfesores();
    this.cargarColegios();
    this.cargarAsignaturas();
    this.cargarCursos();
  }



  seleccionObj(obj){
    this.entidadTitle = this.objects.find(e => e.value == obj)['nombre'];
  }


  cargarColegios(){
    this.entidadService.getColegios().subscribe(colegio => this.colegios = colegio);
  }

  cargarEstudiantes(){
    this.entidadService.getEstudiantes().subscribe(estudiante => this.estudiantes = estudiante);
  }

  cargarProfesores(){
    this.entidadService.getProfesores().subscribe(profesor => this.profesores = profesor);
  }

  cargarCursos(){
    this.entidadService.getCursos().subscribe(curso => this.cursos = curso);
  }

  cargarAsignaturas(){
    this.entidadService.getAsignaturas().subscribe(asignatura => this.asignaturas = asignatura);
  }

  cargarProfesor(id: number){
    this.entidadService.getProfesor(id).subscribe(profesor => { this.dataSource.data = this.buscarCurso(profesor.asignaturas)});
  }

  verEstudiantes(estudiantes: Estudiante[]){
    this.dataSource2.data = estudiantes;
  }

  buscarCurso(asignaturas: Asignatura[]){


    for (let index = 0; index < asignaturas.length; index++) {
      const codasignatura = asignaturas[index]['codigo'];

      for (let i = 0; i < this.cursos.length; i++) {
        const element = this.cursos[i]['asignaturas'];
  
        for (let j = 0; j < element.length; j++) {
          const element2 = element[j];
  
          if(codasignatura == element2.codigo){
              asignaturas[index]['curso'] = `${this.cursos[i].grado}-${this.cursos[i].salon}`;
          }
          
        }
        
      }
    }


    return asignaturas;
  }


  registrarEntidad(){

    const valida = this.validarDatos();

    if(valida.estado) {
      switch (this.entidad) {
        case 1:
          this.entidadService.createEstudiante(this.objEstudiante).subscribe(data => {
            this.estudiantes.push(data);   
          });
          break;
        case 2:
          console.log(this.objCurso);
          this.entidadService.createCurso(this.objCurso).subscribe(data => {
            this.cursos.push(data);   
          });        
            break;
        case 3:
          this.entidadService.createAsignatura(this.objAsignatura).subscribe(data => {
            this.asignaturas.push(data);   
          });
              break;
        case 4:
          this.entidadService.createProfesor(this.objDocente).subscribe(data => {
            this.profesores.push(data);   
          });         
             break;
  
        case 5:
          
          this.entidadService.createColegio(this.objColegio).subscribe(data => {
            this.colegios.push(data);   
          });
          break;
      
        default:
          break;
      }

      this.alerta.alertaExito(`Registro de ${this.entidadTitle} exitoso`);

      this.limpiarEntidad();

    }else{
      this.alerta.alertaError(valida.mensaje);
    }

 
    
  }

  validarDatos(){

    let object = {};
    let valida = {estado:true, mensaje:''};


    switch (this.entidad) {
      case 1:
        object = this.objEstudiante;
        break;
      case 2:
        object = this.objCurso;
        break;
      case 3:
        object = this.objAsignatura;
        break;
      case 4:
        object = this.objDocente;
        break;

      case 5:
        object = this.objColegio;
        break;
    
      default:
        break;
    }

    for (const property in object) {

      if(object[property] == '' || object[property] == 0 || object[property] == null){

        valida.estado = false;

        switch (property) {
          case 'nombre':
            valida.mensaje = `El nombre de ${this.entidadTitle} es obligatorio`;
            break;

          case 'profesor':
            valida.mensaje = `Debe seleccionar un profesor`;
            break;

          case 'curso':
            valida.mensaje = `Debe seleccionar un curso`;
            break;

          case 'grado':
            valida.mensaje = `Debe ingresar un grado`;
            break;

          case 'salon':
            valida.mensaje = `Debe ingresar un salon`;
            break;

          case 'colegio':
            valida.mensaje = `Debe ingresar un colegio`;
            break;
          default:
            break;
        }

      }

    }

    return {estado:true, mensaje:''};
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  limpiarEntidad(){
    this.objColegio = new Colegio();
    this.objEstudiante = new Estudiante();
    this.objDocente = new Profesor();
    this.objCurso = new Curso();
    this.objAsignatura = new Asignatura();
  }

}
