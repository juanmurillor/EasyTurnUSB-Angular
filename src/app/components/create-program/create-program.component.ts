import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DocumentSnapshot, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent implements OnInit {
  seccion: DocumentSnapshot<any>;
  create: boolean = false;
  typeDoc: String = 'seccion';
  error: String = null;
  clicked: boolean = false;
  editedImage: boolean = false;
  url: any = '';
  image: any;
  @ViewChild('myinputname') inputName;
  @ViewChild('closeModal') closeModal;

  constructor(private firestore: AngularFirestore,
    private firestorage: AngularFireStorage,
    private cdr: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }

  changeImage(e) {
    this.editedImage = true;
    this.image = e.target.files[0];
    var url = URL.createObjectURL(e.target.files[0]);
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public openSeccion(seccion, create, type) {
    this.seccion = seccion;
    this.create = create;
    this.typeDoc = type;
    this.clicked = false;
    if (!create) {
      this.url = seccion.data().imagen;
      this.inputName.nativeElement.value = seccion != null ? this.seccion.data().nombre : '';
    } else {
      this.url = null;
      this.image = null;
      this.editedImage = false;
      this.inputName.nativeElement.value ='';
    }
  }

  async save(myForm: NgForm): Promise<void> {
    this.clicked = true;
    if (myForm.valid === true) {
      //generamos o actualizacion
      var doc, docRef;
      if (this.seccion == null && this.create) {
        //creo facultad
        doc = await this.firestore.collection('secciones').add({
          nombre: myForm.value.name,
          imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
          tipo: 'facultad',
          objeto: 'subarea'
        })
        docRef = this.firestore.collection('secciones').doc(doc.id);
      } else if (this.seccion != null && this.create) {
        //creo programa o caja
        var caja = this.seccion.ref.path.match('secciones/cajas/*/') != null;
        doc = await this.firestore.collection('secciones').doc(this.seccion.id).collection('subareas').add({
          nombre: myForm.value.name,
          imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
          objeto: caja ? 'turnos' : 'profesores'
        })
        docRef = this.firestore.collection('secciones').doc(this.seccion.id).collection('subareas').doc(doc.id);
      } else {
        doc=this.seccion;
        docRef = this.seccion.ref;
        this.seccion.ref.update({ nombre: myForm.value.name })
      }


      if (this.editedImage) {
        let storageRef = firebase.storage().ref();
        const refStore = await storageRef.child('secciones/' + doc.id).put(this.image);
        const url = await refStore.ref.getDownloadURL();
        docRef.update({
          imagen: url
        });
      }
      this.notificationService.showSuccess('Se subio con exito', 'Subido');
      this.closeModal.nativeElement.click();
    }
  }
}

