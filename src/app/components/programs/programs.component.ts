import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { $ } from 'protractor';
import { CreateProgramComponent } from '../create-program/create-program.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {
  allPrograms: Array<any> = [];

  @ViewChild('modalCreate') modalCreated;

  constructor(private firestore: AngularFirestore, private cdr: ChangeDetectorRef) {
    this.getAllPrograms();
  }
  ngOnInit() {
  }

  getAllPrograms() {
    this.firestore.firestore.collection('secciones').onSnapshot(async snap => {
      var seccions = [];
      for (const docFac of snap.docs) {
        var subareas = await docFac.ref.collection('subareas').get();
        var progs = [];
        subareas.forEach(doc => {
          progs.push(doc);
        });
        seccions.push({
          seccion:docFac,
          programs:progs,
          show:false,
        });
      }
      this.allPrograms = seccions;
      this.cdr.detectChanges();

    });
  }

  toogleSeccion(seccion){
    seccion.show = !seccion.show
    this.cdr.detectChanges();
  }

  openSeccion(seccion, create, type){
    document.getElementById("openModalButton").click();
    this.modalCreated.openSeccion(seccion, create, type);
  }

}
