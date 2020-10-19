import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../global';
import { Observable } from 'rxjs';
import { Usuarios } from './../../domain/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public url: string;

  constructor(public httpClient: HttpClient) {
    this.url = GLOBAL.url + 'usuarios';
  }

  public save(usuarios: Usuarios): Observable<any> {
    return this.httpClient.post(this.url + '/saveUsuarios/', usuarios);
  }

  public update(usuarios: Usuarios): Observable<any> {
    return this.httpClient.post(this.url + '/updateUsuarios/', usuarios);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/deleteUsuarios/' + id);
  }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + '/getDataUsuarios');
  }

  public findById(id: string): Observable<any> {
    return this.httpClient.get(this.url + '/getUsuarios?email=' + id);
  }

}
