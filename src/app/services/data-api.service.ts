import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  /**
   * Se inicializa AngularFirestore de Firestore
   */
  constructor(private afs: AngularFirestore) {
  }
  data = [];
  /**
   * En el Database de Firebase crear una nueva coleccion (Documento), creando un usuario con los campos de:
   * email, contraseña ,nombre, apellido, telefono y tipo Usuario
   */
  public createUsuarios(data: {
    apellido: string, contraseña: string, email: string,
    nombre: string, telefono: number, tipoUsuario: number
  }) {
    return this.afs.collection('usuarios').add(data);
  }
  /**
   * Todavia no se ha probado - Deberia buscar por el Id de un Documento y retornar la coleccion
   */
  public browseUsuario(documentId: string) {
    return this.afs.collection('usuarios').doc(documentId).snapshotChanges();
  }
  /**
   *  En la coleccion de usuarios busca y retorna el Documento o Documentos que tenga un campo de email igual al parametro ingresado
   */
  public searchUserForEmail(email: string) {
    return this.afs.collection('usuarios', ref => ref.where('email', '==', email)).snapshotChanges();
  }
  /**
   * En la coleccion de TurnosCaja_Tokens busca y retorna el documento que tengo cualquier campo de email igual al parametro ingresado
   */
  public searchCajaForEmail(email: string) {
    return this.afs.collection('TurnosCaja_Tokens', ref => ref.where('email', '==', email)).snapshotChanges();
  }
  /**
   * En la coleccion de TurnosFinanciero_Tokens busca y retorna el documento que tengo cualquier campo de email igual al parametro ingresado
   */
  public searchFinancieroForEmail(email: string) {
    return this.afs.collection('TurnosFinanciero_Tokens', ref => ref.where('email', '==', email)).snapshotChanges();
  }
  /**
   * En la coleccion de TurnosAcademico_Tokens busca y retorna el documento que tengo cualquier campo de email igual al parametro ingresado
   */
  public searchAcademicoForEmail(email: string) {
    return this.afs.collection('TurnosAcademico_Tokens', ref => ref.where('email', '==', email)).snapshotChanges();
  }
  public searchRestauranteForEmail(email:string){
    return this.afs.collection('TurnosRestaurante' , ref => ref.where('Email','==',email)).snapshotChanges();
  }
}
