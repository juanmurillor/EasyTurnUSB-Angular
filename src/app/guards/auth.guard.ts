import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = next.data.logged;
    const roles = next.data.roles;
    const habilited = next.data.habilited;
    return this.authService.getUser().then(user => {
      console.log(user);
      if (!logged) {
        if (user.data().tipoUsuario == 'admin') {
          this.router.navigate(['/admin']);
        } else if (user.data().tipoUsuario == 'profesor' || user.data().tipoUsuario == 'asesor') {
          this.router.navigate(['/bienvenido']);
        } return false;
      } else {
        if (habilited == true && user.data().habilitado != habilited) {
          this.router.navigate(['/']);
          return false;
        } else if (roles != undefined && roles != null && !roles.includes(user.data().tipoUsuario)) {
          if (user.data().tipoUsuario == 'admin') {
            this.router.navigate(['/admin']);
          } else if (user.data().tipoUsuario == 'profesor' || user.data().tipoUsuario == 'asesor') {
            this.router.navigate(['/bienvenido']);
          }
          return false;
        }else{
          return true;
        }
      }
    }).catch(err => {
      console.log(logged);
      if (!logged) {
        return true;
      } else {
        this.router.navigate(['/'])
        return false;
      }
    })
  }

}
