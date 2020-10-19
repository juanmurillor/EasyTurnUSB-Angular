import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { PruebaComponent } from './components/users/prueba/prueba.component';
import { PersonalDataComponent } from './components/users/personal-data/personal-data.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

// Administrativo
import { AsyncPipe } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// Notificaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//material
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { GestionarTurnoComponent } from './components/gestionar-turno/gestionar-turno.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ChartsModule } from 'ng2-charts';
import { AdminComponent } from './components/admin/admin.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { CreateProgramComponent } from './components/create-program/create-program.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    OffersComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    PruebaComponent,
    PersonalDataComponent,
    FooterComponent,
    DashboardComponent,
    GestionarTurnoComponent,
    BienvenidoComponent,
    InicioComponent,
    ChangePasswordComponent,
    EstadisticasComponent,
    AdminComponent,
    ProgramsComponent,
    CreateProgramComponent,
    RecuperarContrasenaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    ChartsModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule { }
