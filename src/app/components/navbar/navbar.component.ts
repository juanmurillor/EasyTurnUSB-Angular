import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatMenuTrigger} from '@angular/material/menu';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { firestore } from 'firebase';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public app_name: string = 'Easy Turn';
  tipoUsuario:String = localStorage.getItem('tipoUsuario');
  public menuCaja:Array<any> = [];

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth, private firestore: AngularFirestore) { 
    this.loadMenus();
  }

  //public isNewRestaurante = false;
  //public local = localStorage.getItem('tipoUsuario');
  ngOnInit() {
  }

  loadMenus(){
    if(this.tipoUsuario === 'asesor'){
      this.firestore.collection('secciones').doc('cajas').collection('subareas').get().subscribe(querySnapshot=>{
        this.menuCaja = querySnapshot.docs
      })
    }
  }

  onLogout() {
    this.afsAuth.auth.signOut();
    //this.local = '';
    localStorage.removeItem('tipoUsuario');
    //localStorage.removeItem('nuevoRestaurante');
  }
}
