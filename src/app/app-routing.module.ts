import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { PruebaComponent } from './components/users/prueba/prueba.component';
import { PersonalDataComponent } from './components/users/personal-data/personal-data.component';
// Administrativo
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GestionarTurnoComponent } from './components/gestionar-turno/gestionar-turno.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { ProgramsComponent } from './components/programs/programs.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard], data: { logged: false } },
  { path: 'admin', canActivate: [AuthGuard], data: { logged: true, roles: ['admin'], habilited: true } ,children:[
    {path:'', component: AdminComponent},
    {path:'secciones', component:ProgramsComponent}
  ]},
  {
    path: 'bienvenido', component: DashboardComponent, canActivate: [AuthGuard], data: { logged: true, roles: ['asesor', 'profesor'], habilited: true }, children: [
      { path: '', component: BienvenidoComponent },
      { path: ':id-caja', component: BienvenidoComponent },
    ]
  },
  {
    path: 'turnos', component: DashboardComponent, canActivate: [AuthGuard], data: { logged: true, roles: ['asesor', 'profesor'], habilited: true }, children: [
      { path: '', component: GestionarTurnoComponent },
      { path: ':id-caja', component: GestionarTurnoComponent },
    ]
  },
  { path: 'cambiar-contrasena', component: ChangePasswordComponent, canActivate: [AuthGuard], data: { logged: true }, },
  {
    path: 'estadisticas', component: DashboardComponent, canActivate: [AuthGuard], data: { logged: true, roles: ['asesor', 'profesor'], habilited: true }, children: [
      { path: '', component: EstadisticasComponent },
    ]
  },
  { path: 'user/recuperar-contrasena', component: RecuperarContrasenaComponent, canActivate: [AuthGuard], data:{logged:false}},
  { path: 'user/register', component: RegisterComponent, canActivate: [AuthGuard], data: { logged: false } },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
