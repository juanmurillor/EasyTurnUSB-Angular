import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../global';
import { Observable } from 'rxjs';
import { Restaurante } from '../../domain/restaurante';


@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  public url: string;

  constructor(public httpClient: HttpClient) {
    this.url = GLOBAL.url + 'restaurante';
  }

  public save(restaurante: Restaurante): Observable<any> {
    return this.httpClient.post(this.url + '/saveRestaurante/', restaurante);
  }

  public update(restaurante: Restaurante): Observable<any> {
    return this.httpClient.post(this.url + '/updateRestaurante/', restaurante);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/deleteRestaurante/' + id);
  }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + '/getDataRestaurante');
  }

  public findById(id: string) {
    return this.httpClient.get(this.url + '/getRestaurante/' + id);
  }

  public findRestauranteByUsuario(email: string) {
    return this.httpClient.get(this.url + '/getRestauranteByUsuario?email=' + email);
  }
}
