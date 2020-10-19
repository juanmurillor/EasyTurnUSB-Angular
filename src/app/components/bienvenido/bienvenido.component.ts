import { Component, OnInit } from '@angular/core';
import { DocumentSnapshot, AngularFirestore, DocumentData, DocumentSnapshotExists } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {
  tasks: Array<String> = [];
  menuCaja:Array<any> = [];
  cajaName: String = null;
  url: String = '/turnos';
  tipoUsuario = localStorage.getItem('tipoUsuario');
  constructor(private authService: AuthService, private firestore: AngularFirestore, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (this.route.snapshot.params['id-caja'] != null || this.tipoUsuario == 'profesor') {
          this.getTasks();
        }else{
          this.getOptions();
        }
        this.url = this.tipoUsuario == 'asesor' ? '/turnos/' + this.route.snapshot.params['id-caja'] : '/turnos'
      }
    );
  }

  getTasks() {
    if (localStorage.getItem('tipoUsuario') == 'asesor') {
      this.firestore.firestore.collection('secciones').doc('cajas').collection('subareas').doc(this.route.snapshot.params['id-caja']).get()
        .then(caja => {
          this.tasks = caja.data().tasks;
          this.cajaName = caja.data().nombre;
        });
    } else {
      this.tasks = ["Gestion turno para profesores"];
      this.cajaName = "profesor"
    }
  }

  getOptions(){
    this.firestore.collection('secciones').doc('cajas').collection('subareas').get().subscribe(querySnapshot=>{
      this.menuCaja = querySnapshot.docs
    })
  }

}
