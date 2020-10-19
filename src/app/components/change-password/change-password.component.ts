import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService) { }
  public passwordOld: string;
  public password: string
  public passwordRepeat: string

  ngOnInit() {
  }
  changePassword(myForm: NgForm): void {
    if (myForm.valid === true && this.password == this.passwordRepeat) {
      this.authService.changePassword(this.password, this.passwordOld).then(done => {
        this.notificationService.showSuccess('Se ha actualizado la contraseña', 'Exito');
      }).catch(err => {
        console.log(err);
        this.notificationService.showError(err.message, 'Error');
      })

    } else {
      this.notificationService.showError('Revisa todos los Campos del Formulario', 'Error');
    }
  }
}
