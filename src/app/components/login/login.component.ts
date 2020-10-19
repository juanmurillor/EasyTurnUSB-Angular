import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataApiService } from '../../services/data-api.service';
import { map, isEmpty } from 'rxjs/operators';
import { NotificationService } from '../../services/notification/notification.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { RestauranteService } from '../../services/restaurante/restaurante.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   *  Se inicializa la Authentication de Firebase
   *  Se inicializa el servicio de AuthService
   *  Se inicializa el servicio de DataApiService
   */
  constructor(public afAuth: AngularFireAuth, private router: Router,
    private authService: AuthService, private dataApiService: DataApiService,
    private notificationService: NotificationService, public restauranteService: RestauranteService) { }
  public email: string;
  public password: string;

  ngOnInit() {
  }

  onLogin(myForm: NgForm): void {
    if (myForm.valid === true) {
      this.authService.loginEmailUser(this.email, this.password).then(userData => {
        if(userData.data().tipoUsuario == "admin"){
        this.router.navigate(["/admin"])
        }else{
          this.router.navigate(["/bienvenido"])
        }
      }).catch(err => this.notificationService.showError(err.message, 'Error'));
    } else {
      this.notificationService.showError('Revisa todos los Campos del Formulario', 'Error');
    }
  }
}
