import { Colegio } from './Colegio';
export class Curso {
    codigo: number;
    grado: number;
    salon: number;
    colegio: Colegio;

    constructor(){
        this.colegio = new Colegio();
    }
}
