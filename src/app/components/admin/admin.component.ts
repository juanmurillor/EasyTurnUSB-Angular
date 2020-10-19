import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Array<any> = [];
  allPrograms: Array<any> = [];

  constructor(private firestore: AngularFirestore, private cdr: ChangeDetectorRef) {
    this.getAllPrograms();

  }

  ngOnInit() {
  }

  getAllPrograms() {
    this.firestore.firestore.collection('secciones').onSnapshot(async snap => {
      const filter = snap.docs.filter(doc => doc.id != 'cajas');
      var progs = [];
      for (const docFac of filter) {
        var subareas = await docFac.ref.collection('subareas').get();
        subareas.forEach(doc => {
          progs.push(doc);
        });
      }
      this.allPrograms = progs;
      this.getUsers();
    })
  }

  getUsers() {
    this.firestore.firestore.collection('usuarios').onSnapshot(snap => {
      var filter = snap.docs.filter(doc => (doc.data().tipoUsuario == 'asesor' || doc.data().tipoUsuario == 'profesor' || doc.data().tipoUsuario == 'admin'));
      console.log(filter);
      this.users = filter;
      this.cdr.detectChanges();
      this.getProgramName(null);
    })
  }

  getProgramName(docref) {
    var actualprog = 'Sin elegir';
    this.allPrograms.forEach(doc => {
      if (doc.ref.path == docref.path) {
        actualprog = doc.data().nombre;
        return actualprog;
      }
    });
    return actualprog;
  }

  changeUserState(user, state) {
    user.ref.update({ 'habilitado': state });
  }
  updateUserProgram(user, program){
    user.ref.update({ 'programa': program.ref });
  }
}
