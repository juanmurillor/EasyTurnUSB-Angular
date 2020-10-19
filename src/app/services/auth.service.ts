import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { resolve } from 'url';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  registerUser(usuarios): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(usuarios.email, usuarios.password)
        .then(async response => {
          delete usuarios["password"];
          await this.afsAuth.auth.signOut();
          this.firestore.collection('usuarios').doc(response.user.uid).set(JSON.parse(JSON.stringify(usuarios))
          ).then(userData => resolve(userData),
            err => reject(err));
        }).catch(err => reject(err))
    });
  }

  loginEmailUser(email: string, pass: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(user => {
          this.firestore.collection('usuarios').doc(user.user.uid).get().subscribe(async (userData) => {
            if (userData.data().habilitado == true) {
              localStorage.setItem("tipoUsuario", userData.data().tipoUsuario);
              resolve(userData);
            } else {
              await this.afsAuth.auth.signOut();
              reject({ message: "Un administrador debe habilitarte" })
            }
          })
        }).catch(err => reject(err));
    });
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.onAuthStateChanged(user => {
        if(user == undefined || user == null){
          reject(null);
          return;
        }
        this.firestore.firestore.collection('usuarios').doc(user.uid).get().then(userData => {
          resolve(userData);
        }).catch(err=>reject(null))
      })

    })
  }

  changePassword(password, passwordOld): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getUser().then(user => {
        var credential = firebase.auth.EmailAuthProvider.credential(
          user.data().email, passwordOld
        )
        firebase.auth().currentUser.reauthenticateWithCredential(credential).then((value) => {
          firebase.auth().currentUser.updatePassword(password).then((value) => {
            resolve(value);
          }).catch(err=>reject(err));
        }).catch((onError) => reject(onError));
      });
    });
  }



  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logoutUser() {
    localStorage.clear();
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
}
