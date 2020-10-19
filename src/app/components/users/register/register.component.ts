import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Usuarios } from './../../../domain/usuarios';
import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { DataApiService } from './../../../services/data-api.service';
import { NotificationService } from './../../../services/notification/notification.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public usuarios: Usuarios;
  public password: string;

  constructor(private router: Router, private authService: AuthService,
    public usuariosService: UsuariosService, 
    private notificationService: NotificationService) { }
  tipoUsuario = "";

  ngOnInit() {
    this.usuarios = new Usuarios('', '', null, '', '', "", 15 );
  }

  onAddUser(myForm: NgForm) {
    if (myForm.valid === true) {
      this.usuarios.password = this.password;
      this.usuarios.tipoUsuario = this.tipoUsuario;
      this.authService.registerUser(this.usuarios).then(response=>{
        myForm.resetForm();
        this.notificationService.showSuccess('Usuario Registrado Correctamente, debes esperar a que un administrador te habilite', 'Notificación');
      }).catch(error=> this.notificationService.showError(error.message, 'Error'))

    } else {
      this.notificationService.showError('Revisa todos los Campos del Formulario', 'Error');
    }
  }



}
