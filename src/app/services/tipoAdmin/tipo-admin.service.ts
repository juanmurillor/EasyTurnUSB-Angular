import { Injectable } from '@angular/core';
import { GLOBAL } from '../../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TipoAdmin} from './../../domain/tipo-admin';

@Injectable({
  providedIn: 'root'
})
export class TipoAdminService {
  public url: string;

  constructor(public httpClient: HttpClient) { 
    this.url = GLOBAL.url + 'administrativos';
  }

  public save(administrativos: TipoAdmin): Observable<any> {
    return this.httpClient.post(this.url + '/saveAdministrativos/', administrativos);
  }

  public update(administrativos: TipoAdmin): Observable<any> {
    return this.httpClient.post(this.url + '/updateAdministrativos/', administrativos);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/deleteAdministrativos/' + id);
  }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + '/getDataAdministrativos');
  }

  public findById(id: string) {
    return this.httpClient.get(this.url + '/getAdministrativos/' + id);
  }
}
