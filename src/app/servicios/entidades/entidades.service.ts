import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../../clases/entidades/estudiante';

import {map} from 'rxjs/operators';
import { Profesor } from '../../clases/entidades/Profesor';
import { Curso } from '../../clases/entidades/Curso';
import { Asignatura } from '../../clases/entidades/Asignatura';
import { Colegio } from '../../clases/entidades/Colegio';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  private urlBackend:string = environment.urlApi;

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }


  //servicios entidad Estudiante
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.urlBackend}/estudiante`);
  }


  createEstudiante(estudiante : Estudiante) : Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.urlBackend}/estudiante`, estudiante, {headers: this.httpHeaders});
  }



  //servicios entidad Profesor
  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.urlBackend}/profesor`);
  }

  createProfesor(profesor : Profesor) : Observable<Profesor> {
    return this.http.post<Profesor>(`${this.urlBackend}/profesor`, profesor, {headers: this.httpHeaders});
  }

  getProfesor(id): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.urlBackend}/profesor/${id}`);
  }



  //servicios entidad colegio
  getColegios(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.urlBackend}/colegio`);
  }

  createColegio(colegio : Colegio) : Observable<Colegio> {
    return this.http.post<Colegio>(`${this.urlBackend}/colegio`, colegio, {headers: this.httpHeaders});
  }


  //servicios entidad curso
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.urlBackend}/curso`);
  }

  createCurso(curso : Curso) : Observable<Curso> {
    return this.http.post<Curso>(`${this.urlBackend}/curso`, curso, {headers: this.httpHeaders});
  }



  //servicios entidad asignatura
  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.urlBackend}/asignatura`);
  }


  createAsignatura(asignatura : Asignatura) : Observable<Asignatura> {
    return this.http.post<Asignatura>(`${this.urlBackend}/asignatura`, asignatura, {headers: this.httpHeaders});
  }
}
