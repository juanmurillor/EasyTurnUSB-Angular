import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FsService {



  constructor(private afs:AngularFirestore) {
    console.log('Service CRUD On');
   }

  //Obtener los turnos
  public getTurnosCaja(){
    return this.afs.collection('TurnosCaja', ref => ref.orderBy('Turno')).snapshotChanges();
  }
  public getTurnosFinanciero(){
    return this.afs.collection('TurnosFinanciero', ref => ref.orderBy('Turno')).snapshotChanges();
  }
  public getTurnosAcademico(){
    return this.afs.collection('TurnosAcademico', ref => ref.orderBy('Turno')).snapshotChanges();
  }
  //Obtiene un turno
  public getTurno(TurnoId:string){
    return this.afs.collection('TurnosCaja').doc(TurnoId).snapshotChanges();

  }
   //Borrar turno
   public deleteTurnoCaja(TurnoId){
    return this.afs.doc(`TurnosCaja/${TurnoId}`).delete();

  }
  public deleteTurnoFinanciero(TurnoId){
    return this.afs.doc(`TurnosFinanciero/${TurnoId}`).delete();

  }
  public deleteTurnoAcademico(TurnoId){
    return this.afs.doc(`TurnosAcademico/${TurnoId}`).delete();

  }
  //Obtener los token Academicos
  public getTokensAcademicos(){
    return this.afs.collection('TurnosAcademico_Tokens').snapshotChanges();
  }
  public deleteTurnoCajaToken(id){
    return this.afs.doc(`TurnosCaja_Tokens/${id}`).delete();
  }

  public deleteTurnoAcademicoToken(id){
    return this.afs.doc(`TurnosAcademico_Tokens/${id}`).delete();
  }
  public deleteTurnoFinancieroToken(id){
    return this.afs.doc(`TurnosFinanciero_Tokens/${id}`).delete();
  }
  //Obtener turnos restaurante
  public getTurnosRestaurante(email){
    return this.afs.collection('TurnosRestaurante', ref => ref.where('Email','==',email)).snapshotChanges();
  }
  public getTurnoRestaurante(email){
    return this.afs.collection('TurnosRestaurante').snapshotChanges();

  }




}
