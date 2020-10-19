import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  public email: string;

  constructor(private authService: AuthService,private notificationService: NotificationService) { }

  ngOnInit() {
  }
  onRecovery(myForm: NgForm): void {
    if (myForm.valid === true) {
      firebase.auth().sendPasswordResetEmail(this.email).then(userData => {
        this.notificationService.showSuccess("Se ha enviado el correo", "Enviado");
      }).catch(err => this.notificationService.showError(err.message, 'Error'));
    } else {
      this.notificationService.showError('Debe ser un correo valido','Error');
    }
  }
}
